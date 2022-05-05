import path from 'path';
import Utils from './utils';
import appConfig from '../../../config'
class Base extends Utils {
  static instance: Base;
  static init: () => Base;
  static getConfig: () => Base;
  public nodeParams: {
    env: 'dev' | 'test' | 'exp' | 'pro';
    mode: 'production' | 'development'
  };

  public nodeEnv: any
  public isDevMode: boolean;
  public isProMode: boolean;
  public cssPublicPath: string = '../';
  public srcPatch: string = path.join(__dirname, '../../../src');
  public appConfig: typeof appConfig;
  constructor () {
    super();
    if (Base.instance) {
      return Base.instance;
    }
    this.init();
    this.appConfig = appConfig;
    Base.instance = this;
  }

  init () {
    this.nodeParams = this.getNodeParams();
    this.nodeEnv = this.setEnvParams();
    this.isDevMode = this.nodeParams.mode === 'development';
    this.isProMode = this.nodeParams.mode === 'production';
    this.writeVersionConfig(this.nodeParams);
  }

  getNodeParams () {
    return Object.fromEntries(
      process.argv.splice(2).map(
        ele => ele.split('=')
      )
    );
  };

  setEnvParams () {
    const nodeParams = this.nodeParams;
    if (nodeParams.mode) { // 运行模式, 本地运行 线上运行
      process.env.NODE_ENV = nodeParams.mode || 'development';
    }

    if (nodeParams.env) { // 开发环境, 开发 测试 体验 线上
      process.env.APP_ENV = nodeParams.env || 'dev';
    }
    return process.env;
  };
}

Base.init = () => {
  return new Base();
};
Base.getConfig = () => {
  if (Base.instance) { return Base.instance; }
  return new Base();
};

export default Base;
