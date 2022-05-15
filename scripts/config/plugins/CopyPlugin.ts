import CopyPlugin from 'copy-webpack-plugin';
import * as path from 'path';
import Base from '../base';

export default () => {
  const { srcPatch } = Base.getConfig();
  return new CopyPlugin({ // 复制静态文件
    patterns: [{
      from: path.join(srcPatch, 'static'),
      to: path.join(srcPatch, '../app/static')
    }, {
      from: path.join(srcPatch, 'pages'),
      to: path.join(srcPatch, '../app/pages')
    }]
  });

}
