import webpack from 'webpack';

export default new webpack.optimize.SplitChunksPlugin({
  cacheGroups: {
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true
    },
    // 打包重复出现的代码
    vendor: {
      name: 'vendor',
      chunks: 'initial',
      minChunks: 2,
      maxInitialRequests: 5,
      minSize: 0
    },
    // 打包第三方类库
    commons: {
      name: 'commons',
      chunks: 'initial',
      minChunks: Infinity
    }
  }
});
