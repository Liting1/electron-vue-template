
export default {
  test: /\.ts$/,
  loader: 'ts-loader',
  options: {
    appendTsSuffixTo: [/\.vue$/]
  }
};
