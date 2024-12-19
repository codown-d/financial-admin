import { storage } from '@/utils/storage';
import { DownOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { 
  history,
  Outlet,
  useAppData,
  useLocation,
  useModel,
  useNavigate,
} from '@umijs/max';
import { Dropdown, MenuProps } from 'antd';
const TzPageContainer: React.FC = () => {
  const location = useLocation();
  const AppData = useAppData();
  const navigate = useNavigate();
  const { routes } = AppData;
  let { userInfo } = useModel('userInfo');
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <>退出登录</>,
      onClick() {
        console.log(67868);
        storage.remove('userInfo');
        storage.clear();
        history.replace('/login');
      },
    },
  ];
  return (
    <PageContainer
      extra={[
        <div key={'user'}>
        用户名：
        <Dropdown menu={{ items }} placement="bottom">
          <span>
            {userInfo.user_name} <DownOutlined />
          </span>
        </Dropdown>
      </div>,
      ]}
    >
      <Outlet />
    </PageContainer>
  );
};
export default TzPageContainer;
