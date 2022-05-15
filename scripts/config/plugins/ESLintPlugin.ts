import ESLintPlugin from 'eslint-webpack-plugin';
import Base from '../base';

// https://www.npmjs.com/package/eslint-webpack-plugin
export default () => {
  const { appConfig } = Base.getConfig();
  const eslintConfig = appConfig.eslint;

  return new ESLintPlugin({
    extensions: ['ts', 'js', 'vue', 'tsx'],
    threads: true,
    exclude: 'node_modules',
    emitError: eslintConfig.emitError,
    emitWarning: eslintConfig?.emitWarning	// 如果出现eslint错误将会在控制台输出警告
  });
}
