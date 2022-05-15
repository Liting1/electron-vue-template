import del from 'del';
import DevMain from './devMain';
import mainConfig from './config/mainConfig';
import DevRender from './devRender';
import renderConfig from './config/renderConfig';
import Base from './config/base';
import DevPreload from './devPreload';
import preloadConfig from './config/preloadConfig';

Base.init({ renderEnv: 'electron' });

const devMain = new DevMain(mainConfig);
const devRender = new DevRender(renderConfig);
const devPreload = new DevPreload(preloadConfig);

function packagerBuild() {
  del(['./app/*', './pack/*']).then(() => {
    Promise.all([devMain.buildMain(), devRender.buildRender(), devPreload.buildPreload()])
      .then((res) => {
        res.forEach((item) => console.log(item));
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

packagerBuild();
