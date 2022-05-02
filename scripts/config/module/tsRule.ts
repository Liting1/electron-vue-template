
export default {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  options: {
    appendTsSuffixTo: [/\.vue$/]
  }
};
