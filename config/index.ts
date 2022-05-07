
export default {
  port: 8090, // 渲染进程本地服务的启动端口号
  analyzerMode: false, // 是否运行代码分析插件
  eslint: {
    emitWarning: true, // 是否在控制台及应用界面输出eslint警告信息
    emitError: true,  // 是否在控制台及应用界面输出eslint错误信息
  },
  proxy: { // 代理配置

  }
};
