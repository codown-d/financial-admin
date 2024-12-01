const proxy = {
    '/api': {
      target: 'http://34282y467g.oicp.vip/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
  },
};

export default proxy;
