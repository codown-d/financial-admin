import { policyThemeFeature } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export default function () {
  const [hot, setHot] = useState({});
  const [theme, setTheme] = useState({});
  const [feature, setFeature] = useState({});
  let policyThemeFeatureFn = useCallback(() => {
    policyThemeFeature().then((res) => {
      let { hot, theme, feature } = res;
      setHot(
        hot.reduce(
          (
            pre: { [x: string]: { text: any } },
            item: { id: string | number; name: any },
          ) => {
            pre[item.id] = { text: item.name };
            return pre;
          },
          {},
        ),
      );
      setTheme(
        theme.reduce(
          (
            pre: { [x: string]: { text: any } },
            item: { id: string | number; name: any },
          ) => {
            pre[item.id] = { text: item.name };
            return pre;
          },
          {},
        ),
      );
      setFeature(
        feature.reduce(
          (
            pre: { [x: string]: { text: any } },
            item: { id: string | number; name: any },
          ) => {
            pre[item.id] = { text: item.name };
            return pre;
          },
          {},
        ),
      );
    });
  }, []);
  useEffect(() => {
    policyThemeFeatureFn();
  }, [policyThemeFeatureFn]);
  return {
    hot,
    theme,
    feature,
  };
}
