import { getUserInfo, policyThemeFeature } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export default function () {
  const [userInfo, setUserInfo] = useState({user_name:''});
  const [userPermission, setUserPermission] = useState([
    ]);
  let fetchUserInfo = useCallback(async () => {
    const response = await getUserInfo();
    setUserInfo(response.data);
    setUserPermission(response.permission||[
      "financialList",
      'customerList',
    'governmentList',
    "financeManagement",
    "productManagement",
    "productBank",
    "productMicroloan",
    "productFinanceGuarantee",
    "productEmergency",
    "productGuarantee",
    "productInsurance",
    "productFund",
    "policyList"])
  }, []);
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);
  return {
    userInfo,
    userPermission
  };
}
