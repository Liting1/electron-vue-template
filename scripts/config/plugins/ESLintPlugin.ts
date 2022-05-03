import ESLintPlugin from 'eslint-webpack-plugin';

// https://www.npmjs.com/package/eslint-webpack-plugin
export default new ESLintPlugin({
  extensions: ['ts', 'js', 'vue', 'tsx'],
  emitWarning: true	// 如果出现eslint错误将会在控制台输出警告
});
