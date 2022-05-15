import webpack from 'webpack';
import { version } from '../../../package.json';
import Base from '../base';


declare global {
  const VERSION: string;
  const MODE: string;
  const APP_ENV: string;
  const RENDER_ENV: 'browser' | 'electron';
}

export default () => {
  const { options } = Base.getConfig();
  return new webpack.DefinePlugin({
    VERSION: JSON.stringify(version),	// 版本号
    APP_ENV: JSON.stringify(process.env.APP_ENV), // 运行的环境
    MODE: JSON.stringify(process.env.NODE_ENV), // 运行模式
    RENDER_ENV: JSON.stringify(options.renderEnv || 'electron'),
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_OPTIONS_API__: true,
  });

}
