import TzImg from '@/components/TzImg';
import { AppConfigProvider } from '@/contexts/AppConfigContext';
import { buildTree } from '@/utils';
import {
  MenuDataItem,
  ProConfigProvider,
  ProLayout,
} from '@ant-design/pro-components';
import './index.css'
import {
  history,
  Outlet,
  useAccess,
  useAppData,
  useModel,
  useNavigate,
} from '@umijs/max';
import { App, ConfigProvider, Dropdown, MenuProps } from 'antd';
import { cloneDeepWith, has, values } from 'lodash';
import { memo, useMemo } from 'react';
import { storage } from '@/utils/storage';
const Layout = () => {
  const AppData = useAppData();
  const accessFull = useAccess();
  const navigate = useNavigate();
  const { routes } = AppData;
  let { userPermission } = useModel('userInfo');
  let menu = useMemo(() => {
    const _routes = cloneDeepWith(routes);
    const noPermission = (key: any) => {
      return key === undefined || userPermission.some((item:string)=>{
        return item.indexOf(key)==0
      })
    };
    const noAccess = (access: string) => access && accessFull.role != access; //&& !get(accessFull, access)
    const notInMenu = (item: MenuDataItem) =>
      has(item, 'redirect') || item.hideInMenu;
    const _menu: any = values(_routes)
      .filter((item: MenuDataItem) => {
        item.icon && (item.icon = <TzImg src={`/images/${item.icon}.png`} />);
        return !(notInMenu(item) || noAccess(item.access));
      })
      .filter((item:MenuDataItem) => {
        return noPermission(item.key);
      });
    let treeData = buildTree(_menu, {
      children: 'routes',
      parentKey: '@@/global-layout',
    });
      console.log(treeData)
    return treeData;
  }, [routes, userPermission]);
  console.log(location.pathname,location.pathname.split('/').map(item=>item.replace('-','_')))
  return (
    <App>
      <ProConfigProvider dark={false}>
        <ProLayout
          siderWidth={250}
          token={{
            bgLayout: '#F7F8FC',
            sider: {
              // colorMenuBackground: '#fff',
            },
          }}
          menuProps={{
            selectedKeys:location.pathname.split('/').map(item=>item.replace('-','_'))
          }}
          menu={{ 
            
            autoClose: false ,
          }}
          route={{
            routes: menu,
          }}
          layout="side"
          menuHeaderRender={() => {
            return (
              <div className="flex justify-center items-center">
                <TzImg src="/images/logo.png" alt="" />
                <div>
                  广元市综合金融
                  <br />
                  <span className="font-bold">管理平台</span>
                </div>
              </div>
            );
          }}
          menuItemRender={(item, dom) => {
            return (
              <div
                onClick={() => {
                  navigate(item.itemPath);
                }}
              >
                {dom}
              </div>
            );
          }}
          // menuFooterRender={(props) => {
          //   if (props?.collapsed) return undefined;
          //   return (
          //     <div key={'user'} className='flex justify-center'>
          //     用户名：
          //     <Dropdown menu={{ items }} placement="bottom">
          //       <span>
          //         {userInfo.user_name} <DownOutlined />
          //       </span>
          //     </Dropdown>
          //   </div>
          //   );
          // }}
          // headerRender={false}
        >
          <ConfigProvider
          theme={{
            components: {
              Menu: {
                colorItemBgActive: "#3C5BF6",
                // controlHeight: 36,
                // paddingInline: 20,
                // defaultColor: '#2177D1',
              },
              // Input: {
              //   paddingBlock: 7,
              //   algorithm: true,
              // },
            },
            // token: {
            //   colorPrimary: '#2177D1',
            // },
          }}
          >
            {/* <PageContainer > */}
            <AppConfigProvider>
              <Outlet />
            </AppConfigProvider>
            {/* </PageContainer> */}
          </ConfigProvider>
          {/* <PageContainer  extra={[<div key={'user'}>用户名：管理员</div>]} footer={undefined}>
          <Outlet />
        </PageContainer> */}
        </ProLayout>
      </ProConfigProvider>
    </App>
  );
};
export default memo(Layout);
