import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default new MiniCssExtractPlugin({ // css打包成css文件插件
  filename: 'css/[name].css',
  chunkFilename: 'css/[id].css',
  ignoreOrder: false
});
