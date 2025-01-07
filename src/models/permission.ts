import { permission,  } from '@/services';
import { merge } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export default function () {
  const [permissionData, setPermissionData] = useState({
    admin_user_permission:[],
    financial_organs_user_permission:[],
    government_department_user_permission:[],
  });
  let fetchPermissions = useCallback(async () => {
    const response = await permission({},{skipErrorHandler:true});
    setPermissionData(
      merge({
        admin_user_permission: ['permission','permission_config'],
        financial_organs_user_permission: [],
        government_department_user_permission: [],
      },response.permission),
    );
  }, []);
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);
  return {
    permissionData
  };
}
