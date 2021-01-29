import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

class Plugin {
  installPlugin () {
    this.vueDevtools();
  }

  // vue 开发插件
  vueDevtools () {
    installExtension(VUEJS_DEVTOOLS)
      .then((name) => console.log(`添加扩展:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }
}
export default new Plugin();
