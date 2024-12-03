import { getUserInfo, policyThemeFeature } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export default function () {
  const [userInfo, setUserInfo] = useState({user_name:''});
  const [userPermission, setUserPermission] = useState(["financialList",
    "financeManagement",
    "productManagement",
    "productBank",
    "productMicroloan",
    "productFinanceGuarantee",
    "productEmergency",
    "productGuarantee",
    "productInsurance",
    "productFund",
    "policyList"]);
  let fetchUserInfo = useCallback(async () => {
    const response = await getUserInfo();
    setUserInfo(response.data);
    // setUserPermission(response.permission)
  }, []);
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);
  return {
    userInfo,
    userPermission
  };
}
