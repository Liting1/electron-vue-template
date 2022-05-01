import CopyPlugin from 'copy-webpack-plugin';
import * as path from 'path';
import Base from '../base';
const { srcPatch } = Base.getConfig();

export default new CopyPlugin({ // 复制静态文件
  patterns: [{
    from: path.join(srcPatch, 'static'),
    to: path.join(srcPatch, '../app/static')
  }, {
    from: path.join(srcPatch, 'pages'),
    to: path.join(srcPatch, '../app/pages')
  }]
});
