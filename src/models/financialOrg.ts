import { financialOrgs } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export default function () {
  const [financialOrg, setFinancialOrg] = useState({});
  let fetchFinancialOrgs = useCallback(async () => {
    const response = await financialOrgs();
    setFinancialOrg(response);
    setFinancialOrg(
      response.dataList.reduce(
        (
          pre: { [x: string]: { text: any } },
          item: { id: string | number; organs_name: any },
        ) => {
          pre[item.id] = { text: item.organs_name };
          return pre;
        },
        {},
      ),
    );
  }, []);
  useEffect(() => {
    fetchFinancialOrgs();
  }, [fetchFinancialOrgs]);
  return {
    financialOrg,
  };
}
