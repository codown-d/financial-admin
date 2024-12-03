import { permission,  } from '@/services';
import { merge } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export default function () {
  const [permissionData, setPermissionData] = useState();
  let fetchPermissions = useCallback(async () => {
    const response = await permission();
    setPermissionData(
      merge(response.permission, {
        financial_organs_user_permission: [],
        government_department_user_permission: [],
        admin_user_permission: ["financialList",
          "financeManagement",
          "productManagement",
          "productBank",
          "productMicroloan",
          "productFinanceGuarantee",
          "productEmergency",
          "productGuarantee",
          "productInsurance",
          "productFund",
          "policyList"],
      }),
    );
  }, []);
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);
  return {
    permissionData
  };
}
