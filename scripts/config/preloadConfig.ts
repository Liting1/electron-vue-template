import Base from './base';
import fs from 'fs';
import path from 'path';

import { tsRule } from './module';
import { dependencies } from '../../package.json';


export default() => {
  const { srcPatch,isDevMode } = Base.getConfig();

  const getEnterFile = () => {
    const filePath = path.join(srcPatch, 'main/preloadScript');
    const files = fs.readdirSync(filePath);
    const enter = {};
    files.forEach((file) => {
      const info = fs.statSync(path.join(filePath, file));
      if (info.isDirectory()) {
        const stat = fs.statSync(path.join(filePath, file, 'index.ts'));
        if (stat.isFile()) {
          enter[file] = path.join(filePath, file, 'index.ts');
        }
      }
    });
    return enter;
  };

  return {
    entry: getEnterFile(),
    mode: isDevMode ? 'development' : 'production',
    output: {
      filename: '[name]/index.js',
      path: path.resolve(srcPatch, '../app/preloadScript'),
      library: {
        type: 'commonjs2',
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    module: {
      rules: [tsRule()]
    },
    externals: [
      ...Object.keys(dependencies || {})
    ],
    node: {
      __dirname: false,
      __filename: false,
    },
    target: 'electron-preload',
    watch: isDevMode
  }
}
