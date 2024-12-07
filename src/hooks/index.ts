import { getArea } from '@/services';
import { storage } from '@/utils/storage';
import { useCallback, useEffect, useState } from 'react';

export const useAreaData = () => {
  let [areaData, setAreaData] = useState<any>(storage.get('areaData')||[]);
  let getAreaFn = useCallback((callback?: (arg: any) => void) => {
    getArea().then((res) => {
      setAreaData(res.data);
      storage.set('areaData', res.data);
      callback?.(res);
    });
  }, []);
  useEffect(() => {
    getAreaFn();
  }, [getAreaFn]);
  return { areaData, getAreaFn };
};
export const useServeAction = () => {
  let [areaData, setAreaData] = useState<any>(storage.get('areaData')||[]);
  let getAreaFn = useCallback((callback?: (arg: any) => void) => {
    getArea().then((res) => {
      setAreaData(res.data);
      storage.set('areaData', res.data);
      callback?.(res);
    });
  }, []);
  useEffect(() => {
    getAreaFn();
  }, [getAreaFn]);
  return { areaData, getAreaFn };
};
