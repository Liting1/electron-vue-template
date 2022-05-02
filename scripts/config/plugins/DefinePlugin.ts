import webpack from 'webpack';
import { version } from '../../../package.json';

export default new webpack.DefinePlugin({
  VERSION: JSON.stringify(version),	// 版本号
  MODE: JSON.stringify(process.env.MODE), // 运行的环境
  NODE_ENV: JSON.stringify(process.env.NODE_ENV) // node环境
});

declare global {
  interface Window {
    readonly VERSION: string;
    readonly MODE: string;
    readonly NODE_ENV: string;
  }
  const VERSION: string;
  const MODE: string;
  const NODE_ENV: string;
}

