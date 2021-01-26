const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');

module.exports = {
  installPlugin () {
    this.vueDevtools();
  },
  // vue 开发插件
  vueDevtools () {
    installExtension(VUEJS_DEVTOOLS)
      .then((name) => console.log(`添加扩展:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }
};
