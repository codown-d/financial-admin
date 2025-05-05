import { get, isArray, keys, set } from 'lodash';
// import * as NProgress from 'nprogress';
import { history, proxy } from '@umijs/max';
import queryString from 'query-string';
import { AxiosCanceler } from './axiosCancel';
import { showError } from './utils';
import { storage } from './utils/storage';

type requestStoreProps = { url?: string; timestamp: number };
const requestStoreAction = (url: string, interval = 1000) => {
  const curTime = +new Date();
  if (curTime - requestStore.timestamp > interval) {
    requestStore.url = url;
    requestStore.timestamp = curTime;
  }
};

export const requestStore = proxy<requestStoreProps>({
  url: undefined,
  timestamp: 0,
});

// NProgress.configure({
//   easing: 'linear',
//   speed: 350,
//   showSpinner: false,
// });
// const codeMessage: Record<number, string> = {
//   200: translate('request.code.200'),
//   201: translate('request.code.201'),
//   202: translate('request.code.202'),
//   204: translate('request.code.204'),
//   400: translate('request.code.400'),
//   401: translate('request.code.401'),
//   403: translate('request.code.403'),
//   404: translate('request.code.404'),
//   406: translate('request.code.406'),
//   410: translate('request.code.410'),
//   422: translate('request.code.422'),
//   500: translate('request.code.500'),
//   502: translate('request.code.502'),
//   503: translate('request.code.503'),
//   504: translate('request.code.504'),
// };

const axiosCanceler = new AxiosCanceler();

const requestInterceptors = (request: {
  isSignal?: boolean;
  headers: { Authorization: string; Token: string };
}) => {
  const tk = storage.get('token');
  if (tk) request.headers.Authorization = `Bearer ${tk}`;
  if (tk) request.headers.Token = `${tk}`;
  const contentType = get(request, ['headers', 'Content-Type']);
  !contentType && set(request, ['headers', 'Content-Type'], 'application/json');
  // set(request, ['headers', 'Accept-Language'], lang === EN_LANG ? 'en' : 'zh');
  // NProgress.start();
  return request;
};
const responseInterceptors = async (response: any) => {
  const {
    status,
    data: { code },
    config: { customHandleRes, skipErrorHandler },
  } = response;
  if (status == 200) {
    return response;
  } else {
    return Promise.reject(response);
  }
};
const errorHandler = (response: any) => {
  if (response?.status) {
    const { status, data, config, headers } = response;
    const errorTxt = data?.desc;
    if (!config?.skipErrorHandler) {
      showError({
        key: status === 401 ? status : +new Date(),
        content: errorTxt,
      });
    }
    if (status === 401 || data.code === 401) {
      storage.remove('userInfo');
      storage.clear();
      history.replace('/login');
    } else if (503 === status) {
      history.replace('/503');
    }
    return response;
  } else if (!response) {
    // message.error('request.errorTip');
  }
  return response;
};
const isDev = process.env.NODE_ENV === 'development';
export const requestConfig = {
  paramsSerializer: (params: { [x: string]: any }) => {
    const { current: page, pageSize: limit, ...rest } = params;
    if (params?.current || params?.pageSize) {
      params = { limit, page, ...rest };
    }
    const newParams = {};
    keys(params)?.forEach((key) =>
      set(
        newParams,
        key,
        isArray(params[key]) && !params[key].length
          ? JSON.stringify(params[key])
          : params[key],
        //params[key]
      ),
    );
    //return qs.stringify(params, { indices: false });
    return queryString.stringify(newParams, {
      arrayFormat: 'comma',
    });
  },
  baseURL: isDev?'/api':API_BASE_URL,
  retryTimes: 3,
  timeout: 10 * 1000,
  // getResponse: true,
  requestInterceptors: [requestInterceptors],
  responseInterceptors: [
    responseInterceptors,
    (response: any) => {
      const { code } = response.data;
      if (code === 200) {
        return response;
      }
      return Promise.reject(response);
    },
  ],
  errorConfig: { errorHandler },
};
