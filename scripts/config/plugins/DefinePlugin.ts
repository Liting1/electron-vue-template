import webpack from 'webpack';
import { version } from '../../../package.json';

declare global {
  const VERSION: string;
  const MODE: string;
  const APP_ENV: string;
}

export default new webpack.DefinePlugin({
  VERSION: JSON.stringify(version),	// 版本号
  APP_ENV: JSON.stringify(process.env.APP_ENV), // 运行的环境
  MODE: JSON.stringify(process.env.NODE_ENV), // 运行模式
});

