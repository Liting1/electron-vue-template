import DevMain from './devMain';
import mainConfig from './config/mainConfig';
import DevRender from './devRender';
import renderConfig from './config/renderConfig';
import * as electronBuilder from 'electron-builder';
import del from 'del';
import path from 'path';
import Base from './config/base';

// 初始化基础信息
const { isDevMode, openExplorer } = Base.init();

const devMain = new DevMain(mainConfig);
const devRender = new DevRender(renderConfig);

function developmentBuild() {
  Promise.all([devMain.buildMain(), devRender.buildRender()])
    .then((res) => {
      res.forEach((item) => console.log(item));
    })
    .catch((err) => {
      console.log(err);
    });
}

function productionBuild() {
  del(['./app/*', './pack/*']).then(() => {
    Promise.all([devMain.buildMain(), devRender.buildRender()])
      .then((res) => {
        res.forEach((item) => console.log(item));
        const openPath = path.join(__dirname, '../pack');
        electronBuilder
          .build()
          .then(() => openExplorer(openPath))
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

if (isDevMode) {
  developmentBuild();
} else {
  productionBuild();
}
