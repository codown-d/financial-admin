import { PageBreadcrumb, } from '@/components/PageHeader';
import PageBreadCrumb from '@/components/PageHeader/PageBreadcrumb';
import { TzButton } from '@/components/TzButton';
import { AppPageProvider, useAppPageContext } from '@/contexts/AppPageContext';
import { RollbackOutlined } from '@ant-design/icons';
import {
  PageContainer,
  PageHeaderProps,
  ProCard,
} from '@ant-design/pro-components';
import { Link, Outlet, useAppData, useLocation, useNavigate } from '@umijs/max';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { find } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
const TzPageContainer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const AppData = useAppData();
  const { routes } = AppData;
  let route = useMemo(() => {
    return find(routes, { path: location.pathname }) as PageHeaderProps;
  }, [routes, location]);
  const { header, setHeader, tabList, setTabList, footer, setFooter } =
    useAppPageContext();
  useEffect(() => {
    console.log(route?.breadcrumb)
    setHeader({
      title: undefined,
      breadcrumb: { items: route?.breadcrumb as ItemType[] },
      breadcrumbRender:(props: any, defaultDom: React.ReactNode) => {
        return (
          <PageBreadCrumb {...props?.breadcrumb} className='mt-8 mb-3'/>
        );
      },
      extra: undefined,
    });
  }, [route]);
  let onBack = useCallback(() => {
    console.log(header)
    navigate(-1);
  }, [header]);
  let proCardTitle = useMemo(() => {
    return (
      <TzButton icon={<RollbackOutlined />} onClick={onBack}>
        返回
      </TzButton>
    );
  }, [header?.breadcrumb]);
  return (
    <PageContainer
      header={header}
      tabList={tabList}
      footer={footer}
    >
      <ProCard title={proCardTitle} headerBordered  className='pb-6'>
        <Outlet />
      </ProCard>
    </PageContainer>
  );
};
const TzPageContainerWrap: React.FC = () => {
  return (
    <AppPageProvider>
      <TzPageContainer />
    </AppPageProvider>
  );
};
export default TzPageContainerWrap;
