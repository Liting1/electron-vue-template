import Base from '../base';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';


export default () => {
  const { isDevMode, cssPublicPath } = Base.getConfig();
  const devUse = ['vue-style-loader', 'style-loader'];
  const proUse = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: cssPublicPath // 添加公共路径
    }
  }];

  return {
    test: /\.css(\?.*)?$/,
    use: [
      ...(
        isDevMode ? devUse : proUse
      ),
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDevMode
        }
      }
    ]
  };
}
