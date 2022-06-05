
export default () => {
  return { // 配置Babel将ES6+ 转换为ES5
    test: /\.js(\?.*)?$/,
    exclude: file => ( // 排除node_modules文件夹
      /node_modules/.test(file) && !/\.vue\.js/.test(file)
    ),
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    }
  };
}
