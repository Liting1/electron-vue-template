
export default () => ({ // 配置字体文件加载
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  use: {
    loader: 'file-loader',
    options: {
      esModule: false,
      limit: 10000,
      name: 'fonts/[name].[hash].[ext]'
    }
  }
});
