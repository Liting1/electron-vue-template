import Base from './config/base';
import DevRender from './devRender';
import renderConfig from './config/renderConfig';

Base.init({ renderEnv: 'browser' });
const devRender = new DevRender(renderConfig);

devRender
  .buildRender()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
