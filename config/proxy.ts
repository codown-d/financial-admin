const proxy = {
    '/api': {
      target: 'http://219.151.185.167:3900/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
  },
};

export default proxy;
