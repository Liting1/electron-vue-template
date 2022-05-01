import del from 'del';
import DevMain from './devMain';
import mainConfig from './config/mainConfig';
import DevRender from './devRender';
import renderConfig from './config/renderConfig';

const devMain = new DevMain(mainConfig);
const devRender = new DevRender(renderConfig);
function packagerBuild () {
  del(['./app/*', './pack/*']).then(() => {
    Promise.all([devMain.buildMain(), devRender.buildRender()]).then(res => {
      res.forEach(item => console.log(item));
    }).catch(err => {
      console.log(err);
    });
  });
}

packagerBuild();
