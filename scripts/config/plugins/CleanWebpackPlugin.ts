import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default new CleanWebpackPlugin({ // 清除所有文件，main.js文件除外
  // cleanOnceBeforeBuildPatterns: ['**/*', '!main.js*']
});
