import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import Base from '../base';

export default () => {
  const { srcPatch } = Base.getConfig();
  return new HtmlWebpackPlugin({ // HTML页面模板插件
    template: path.join(srcPatch, 'renderer/index.html'),
    filename: 'index.html',
    hash: true
  });
}
