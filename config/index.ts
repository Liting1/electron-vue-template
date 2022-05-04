
// const ENV = process.env.ENV;
// const NODE_ENV = process.env.NODE_ENV;
//

export default (options) => ({
  port: 8090, // 渲染进程本地服务的启动端口号
  eslint: {
    emitWarning: true, // 是否在控制台及应用界面输出eslint警告信息
    emitError: true,  // 是否在控制台及应用界面输出eslint错误信息
  },
  proxy: { // 开发环境下的服务代理请求配置,
    '/api': 'http://localhost:8088',
  }
});
