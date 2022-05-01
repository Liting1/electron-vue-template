import Base from '../base';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const developmentUse = ['vue-style-loader'];
const { isDevMode, cssPublicPath } = Base.getConfig();

const productionUse = [{
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: cssPublicPath
  }
}];

export default {
  test: /\.s[ac]ss$/,
  use: [
    ...(isDevMode ? developmentUse : productionUse),
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          indentedSyntax: true // 如需使用花括号嵌套模式则设置为 false
        }
      }
    }
  ]
};
