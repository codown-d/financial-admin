import { waitTimePromise } from '@/utils';
import { request } from '@umijs/max';
import api from './api';

export async function userList(
  params: {
    keyword?: string;
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<any>(api.userList, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getAppConfig(
  params?: any,
  options?: { [key: string]: any },
) {
  return waitTimePromise();
  return request<any>(api.userList, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function adminLogin(
  params: any,
  options?: { [key: string]: any },
) {
  return request<any>(api.adminLogin, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function financialList(
  params: {
    keyword?: string;
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<any>(api.financialList, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function governmentList(
  params: {
    keyword?: string;
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<any>(api.governmentList, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function financialDelete(
  params: { id: string | number },
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.financialDelete}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function financialDetail(
  params: { id: string | number | null },
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.financialDetail}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function financialSave(
  params: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.financialSave}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getArea(params?: any, options?: { [key: string]: any }) {
  return request<any>(`${api.getArea}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function policyList(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.policyList}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function policyThemeFeature(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.policyThemeFeature}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function policyDetail(
  params: { id: string | number },
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.policyDetail}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function policySave(
  params: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.policySave}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function policyDelete(
  params: { id: string | number },
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.policyDelete}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function permission(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.permission}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function guaranteeList(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.guaranteeList}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function financialOrgs(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.financialOrgs}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function guaranteeSave(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.guaranteeSave}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function guaranteeDetail(
  params: { id: string | number },
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.guaranteeDetail}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function fundList(params: any, options?: { [key: string]: any }) {
  return request<any>(`${api.fundList}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function fundDetail(
  params: { id: string | number },
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.fundDetail}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function fundSave(params?: any, options?: { [key: string]: any }) {
  return request<any>(`${api.fundSave}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function fundDelete(
  params: any,
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.fundDelete}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function insuranceList(
  params: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.insuranceList}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function insuranceDetail(
  params: { id: string | number },
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.insuranceDetail}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function insuranceSave(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.insuranceSave}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function insuranceDelete(
  params: any,
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.insuranceDelete}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function loanList(
  params: {
    product_type: any;
    [x: string]: any;
  },
  options?: { [key: string]: any },
) {
  return request<any>(`${api.loanList}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function loanDetail(
  params: {
    id: any;
    product_type: any;
    [x: string]: any;
  },
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.loanDetail}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function loanSave(
  params?: {
    product_type: any;
    [x: string]: any;
  },
  options?: { [key: string]: any },
) {
  return request<any>(`${api.loanSave}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function loanDelete(
  params: {
    id: any;
    product_type: any;
    [x: string]: any;
  },
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.loanDelete}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function allList(params: any, options?: { [key: string]: any }) {
  return request<any>(`${api.allList}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function getUserInfo(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.userInfo}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function applyList(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.applyList}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function departmentList(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.departmentList}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function adminUserLogout(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.adminUserLogout}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function applyAction(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.applyAction}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function adminUpdateInfo(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.adminUpdateInfo}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function financialUserDetail(
  params?: any,
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.financialUserDetail}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function financialUserList(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.financialUserList}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function financialUserDelete(
  params?: any,
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.financialUserDelete}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function governmentDepartmentDelete(
  params?: any,
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.governmentDepartmentDelete}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function governmentUserList(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.governmentUserList}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function governmentDepartmentSave(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.governmentDepartmentSave}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function governmentUserSave(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.governmentUserSave}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function governmentUserDetail(
  params?: any,
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.governmentUserDetail}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function governmentDepartmentUserDelete(
  params?: any,
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.governmentDepartmentUserDelete}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function governmentDepartmentDetail(
  params?: any,
  options?: { [key: string]: any },
) {
  let { id } = params;
  return request<any>(`${api.governmentDepartmentDetail}/${id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function adminPermission(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.adminPermission}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function organsUserSave(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.organsUserSave}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function servicePolicy(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.servicePolicy}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function financeAction(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.financeAction}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function allocation(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(`${api.allocation}`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
