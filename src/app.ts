// 运行时配置

import { createBrowserHistory } from '@umijs/max';
import { requestConfig } from './requestConfig';
import { getUserInfo } from './services';
import { setupGlobalErrorHandling } from './utils/setupGlobalErrorHandling';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
// 最简单的使用方式
type Role='admin'|'user'|'editor'
setupGlobalErrorHandling();

const history = createBrowserHistory();
export async function getInitialState() {
  const user = await getUserInfo();
  return { name: '@umijs/max', history, user };
}

console.log('process.env.UMI_APP_API_BASE_URL',process.env.UMI_APP_API_BASE_URL)
export const request = {
  ...requestConfig,
};
