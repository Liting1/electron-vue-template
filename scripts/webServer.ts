import Base from './config/base';
import DevRender from './devRender';
import renderConfig from './config/renderConfig';

Base.init();

const devRender = new DevRender(renderConfig);

devRender
  .buildRender()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
