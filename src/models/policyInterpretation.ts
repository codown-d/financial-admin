import { servicePolicy } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export default function () {
  const [interpretation, setInterpretation] = useState({});
  let getServicePolicy = useCallback(async () => {
    const res = await servicePolicy({
      body_type: 2,
      page: 1,
      limit: 10,
    },{skipErrorHandler:true});
    setInterpretation(
      res.dataList.reduce((pre: any, item: any) => {
        pre[item.id] = { text:item.area_type_desc+ item.sub_title };
        return pre;
      }, {}),
    );
  }, []);
  useEffect(() => {
    getServicePolicy();
  }, [getServicePolicy]);
  return {
    interpretation,
  };
}
