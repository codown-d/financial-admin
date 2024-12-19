import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';
const { BASE_URL, API_BASE_URL, PUBLIC_PATH } = process.env;
console.log('BASE_URL',BASE_URL)
console.log('API_BASE_URL', API_BASE_URL)
console.log('PUBLIC_PATH', PUBLIC_PATH)
export default defineConfig({
  define: {
    BASE_URL,
    API_BASE_URL,
    PUBLIC_PATH,
  },
  title: '广元市综合金融管理平台',
  base: BASE_URL,
  publicPath: PUBLIC_PATH+'/',
  history: { 
    type: 'browser',
  },
  antd: {},
  access: {},
  model: {},
  valtio: {},
  initialState: {},
  request: {
    // dataField: 'data'
  },
  proxy,
  routes,
  layout: false,
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
