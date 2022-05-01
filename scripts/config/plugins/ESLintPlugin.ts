import ESLintPlugin from 'eslint-webpack-plugin';

export default new ESLintPlugin({
  extensions: ['ts', 'js', 'vue'],
  emitWarning: true	// 如果出现eslint错误将会在控制台输出警告
});
