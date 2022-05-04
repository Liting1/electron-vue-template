import fs from 'fs';
import path from 'path';
import { app } from 'electron';

class Utils {
  // 判断一个变量类型是否为对象
  protected once: Boolean;
  isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  // 判断一个变量类型是否是数组
  isArray (arr) {
    return Array.isArray(arr);
  }

  // 判断一个变量类型是否是字符串
  isString (str) {
    return Object.prototype.toString.call(str) === '[object String]';
  }

  /**
	 * 格式化查询数据，将查询出来的数据进行格式化为json对象
	 * @param  { Object } data 查询所得结果
	 * @return { Array }      返回查询格式化之后的数据
	 */
  formatSelectData ({ values, columns }: Record<string, any>): Array<any> {
    if (!values || !columns) return [];
    return values.map(
      res => res.reduce(
        (a, b, index) => Object.assign(a, { [columns[index]]: b }), {}
      )
    );
  }

  /**
	 * 格式化插入数据
	 * @param  {Object} data 	需要格式化的对象
	 * @return {Object}      	返回格式化之后的对象
	 */
  formatData (data) {
    return Object.entries(data).reduce((a, b, i) => ({
      key: a.key + (i ? ',' : '') + b[0],
      val: a.val + (i ? ',' : '') + (this.isString(b[1]) ? `'${b[1]}'` : (b[1] === undefined ? null : b[1]))
    }), { key: '', val: '' });
  }

  /**
	 * 格式化条件数据
	 * @return {[type]} [description]
	 */
  formatWhereData (whe, spt = ' AND ') {
    return Object.entries(whe).map(ele => (
      ele[0] + '=' + (this.isString(ele[1]) ? `'${ele[1]}'` : (ele[1] === undefined ? null : ele[1])))
    ).join(spt);
  }

  /**
	 * 格式化创建表格数据
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
  formatCreateTableData (data) {
    let content = '';
    for (const key in data) {
      content += `,${key} `;
      if (Array.isArray(data[key])) {
        content += data[key].join(' ');
      } else if (typeof data[key] === 'string') {
        content += data[key];
      } else {
        console.error('表的字段约束必须为字符串或者是数组');
      }
    }
    return content.slice(1);
  }

  /**
	 * 比较两个数组的差异
	 * @param  {Array} oldField 	旧数组
	 * @param  {Array} newField 	新数组
	 * @return {Object}          	{ newField 表示相对旧数组新增的元素, oldField 表示相对新数组多出的元素 }
	 */
  diff (oldField, newField) {
    newField.forEach((item, index) => {
      const idx = oldField.indexOf(item);
      if (idx >= 0) {
        newField[index] = '';
        oldField[idx] = '';
      }
    });
    newField = newField.filter(item => item);
    oldField = oldField.filter(item => item);
    return { newField, oldField };
  }

  // 新增字段如果存在默认值则设置默认值
  defaultValue (val) {
    if (val === undefined) return '';
    return this.isString(val)
      ? `default '${val}'`
      : `default ${val}`;
  }

  // 数据库存储地址
  getDatabaseUrl () {
    const dbName = {
      dev: 'dbDev.sqlite',		// 开发环境
      test: 'dbTest.sqlite',	// 测试环境
      exp: 'dbExp.sqlite',		// 体验环境
      pro: 'db.sqlite' 				// 生产环境
    };
    const databaseUrl = dbName[APP_ENV];
    return {
      dbpath: path.join(app.getPath('userData'), databaseUrl),
      dbBackupPath: path.join(app.getPath('userData'), 'backup' + databaseUrl)
    };
  }

  // 错误处理函数
  errorHandler (error, sql) {
    if (!this.once) {
      this.once = true;
      // 使用备份数据库
      const { dbBackupPath, dbpath } = this.getDatabaseUrl();
      fs.rename(dbBackupPath, dbpath, (err) => {
        if (err) {
          // 如果复制使用备份数据库任然出错，则删除数据库从新初始化
          fs.unlink(dbpath, async err => {
            if (err) {
              this.log(err, '删除文件失败');
            } else {
              // 删除缓存文件
              await this.initDatabase();
            }
            this.once = false;
            // this.win.webContents.send('dbError');
          });
        }
        this.log(error, sql);
      });
    }
  }

  // 错误日志处理函数
  log (err, sql) {
    const { dbpath } = this.getDatabaseUrl();
    const txt = `${sql}---${err}---${process.env.VUE_APP_TITLE}---${new Date().toLocaleString()} \n`;
    fs.appendFile(path.dirname(dbpath) + '/database.log', txt, (e) => {
      if (e) console.log('写入日志出错');
    });
  }

  /**
	 *  数据库备份
	 */
  backupDataBase (db, options) {
    const timerFun = (bool) => {
      const blob = bool ? db.export() : fs.readFileSync(options.database);
      fs.writeFile(this.getDatabaseUrl().dbBackupPath, blob, (err) => {
        if (err) console.log('备份数据库失败');
      });
    };

    // 每次启动程序时备份一次
    timerFun(true);
    // 启动程序后每隔半小时备份一次
    setInterval(() => timerFun(false), 1800000);
  }

  protected async initDatabase () {
    return null;
  }
}

export default Utils;
