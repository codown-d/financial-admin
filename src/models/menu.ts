import { buildTree } from '@/utils';
import { MenuDataItem } from '@ant-design/pro-components';
import { useAccess, useAppData } from '@umijs/max';
import { cloneDeepWith, get, has, values } from 'lodash';
import { useMemo } from 'react';

export default function () {
  const accessFull = useAccess();
  const AppData = useAppData();
  const { routes } = AppData;
  let menu = useMemo(() => {
    const _routes = cloneDeepWith(routes);
    const noAccess = (access: string) => access && !get(accessFull, access);
    const notInMenu = (item: MenuDataItem) =>
      has(item, 'redirect') || item.hideInMenu;
    const _menu: any = values(_routes).filter((item: MenuDataItem) => {
      return !(notInMenu(item) || noAccess(item.access));
    });
    let treeData = buildTree(_menu, {
      children: 'routes',
      parentKey: '@@/global-layout',
    });
    return treeData;
  }, [routes]);
  return {
    menu
  };
}
