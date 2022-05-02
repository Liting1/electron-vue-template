import Utils from './Utils';

class Table extends Utils {
  /**
	 * 初始化数据库表
	 * @param  {String} tableName 表名
	 * @param  {Object} data      表字段约束
	 * @param  {Object} initData  表第一条初始数据
	 * @return {[type]}           [description]
	 */
  createTableSql (tableName, data, initData) {
    let insert = '';
    if (initData) {
      const init = this.formatData(initData);
      insert = `INSERT INTO ${tableName} (${init.key}) values(${init.val})`;
    }
    return {
      name: tableName,
      sql: `CREATE TABLE ${tableName} (${this.formatCreateTableData(data)}); ${insert}`,
      field: Object.keys(data),
      data,
      initData: initData || {}
    };
  }

  // 创建表
  userTable () {
    return this.createTableSql('test', {
      username: 'varchar(10)',
      password: 'varchar(20)',
      userID: 'varchar(5)',
      desc: 'text'
    }, {
      username: 'liTing',
      password: '123456',
      userID: '00000',
      desc: 'hello world'
    });
  }
}
export default Table;
