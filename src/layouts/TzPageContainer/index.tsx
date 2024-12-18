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

  return (
    <PageContainer
      extra={[
       
      ]}
    >
      <Outlet />
    </PageContainer>
  );
};
export default TzPageContainer;
