import Mock from 'mockjs';

export default {
  // 定义 GET 请求接口
  'GET /api/user/list': Mock.mock({
    data: {
      'list|20': [
        {
          'id|+1': 1,
          account: '@natural(13000000000, 13999999999)', // 生成随机手机号
          password: '@string("number", 6)', // 生成6位随机数字字符串
          registerTime: '@datetime', // 生成随机日期时间
          area: '@province @city', // 生成省市
          'realAuth|1': ['已认证', '未认证'], // 生成已认证或未认证
          enterpriseAuth: '已认证',
          enterpriseName: '@company', // 生成公司名称
        },
      ], 
      total: 123,
    },
    success:'true'
  }),
};
