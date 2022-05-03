import { app, session } from 'electron';
import path from 'path';
class Plugin {
  installPlugin () {
    this.vueDevtools();
  }

  // vue 开发插件
  vueDevtools () {
    session.defaultSession.loadExtension(path.join(app.getAppPath(), __dirname, './vue3-devtools')).then(res => {
      console.log(`${res.name} 安装成功`);
    }).catch(err => {
      console.log(err);
    });
  }
}
export default new Plugin();
