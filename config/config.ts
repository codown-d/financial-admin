import { defineConfig } from '@umijs/max';
import routes from './routes';
import { layout } from './layout';
import proxy from './proxy';
export default defineConfig({
  title: '广元市综合金融管理平台',
  // history: {
  //   type: 'browser',
  // },
  antd: {},
  access: {},
  model: {},
  valtio: {},
  initialState: {},
  request: { 
    // dataField: 'data' 
  },
  history: { type: 'browser' },
  proxy,
  routes,
  layout:false,
  npmClient: 'pnpm',
  tailwindcss: {},
  mock: {
    // 开启 mock 功能
    // include: ['mock/**'],
    // 可以自定义 mock 请求的路径
    // 默认情况下，会根据文件路径生成接口
    // 例如 mock/user.ts 会映射到 /api/user
    // path: 'mock'
  },
});
