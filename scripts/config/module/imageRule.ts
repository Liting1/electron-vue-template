
export default { // 配置图片文件加载
  test: /\.(png|jpe?g|gif|tif?f|bmp|webp|svg)(\?.*)?$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      esModule: false,
      name: 'images/[name].[hash].[ext]'
    }
  }
};
