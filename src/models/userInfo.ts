import { getUserInfo, policyThemeFeature } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export default function () {
  const [userInfo, setUserInfo] = useState({user_name:''});
  let fetchPermissions = useCallback(async () => {
    const response = await getUserInfo();
    console.log(response.data)
    setUserInfo(response.data);
  }, []);
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);
  return {
    userInfo
  };
}
