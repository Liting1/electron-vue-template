const args = process.argv.splice(2);
const params = Object.fromEntries(args.map(ele => ele.split('=')));

module.exports = {
  params,
  // 参考代码： https://webpack.docschina.org/configuration/dev-server/#devserverproxy
  proxy: {	// 开发环境下配置服务器代理
    '/api': {
      target: 'http://localhost',
      pathRewrite: { '^/api': '' }
    }
  }
};
