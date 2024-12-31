const proxy = {
    '/api': {
      target: 'https://admin.gyzhjr.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
  },
};

export default proxy;
