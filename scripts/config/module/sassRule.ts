import Base from '../base';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const developmentUse = ['vue-style-loader'];
const {
  isDevMode,
  cssPublicPath
} = Base.getConfig();

const productionUse = [{
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: cssPublicPath
  }
}];

const getUse = (bool = false) => [
  ...(isDevMode ? developmentUse : productionUse),
  'css-loader',
  {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        indentedSyntax: bool // 如需使用花括号嵌套模式则设置为 false
      }
    }
  }
];

export default [{
  test: /\.sass$/,
  use: getUse(true)
},{
  test: /\.scss$/,
  use: getUse()
}];
