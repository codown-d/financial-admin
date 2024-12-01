import { PageContainer } from '@ant-design/pro-components';
import { Outlet, useAppData, useLocation, useModel, useNavigate } from '@umijs/max';
const TzPageContainer: React.FC = () => {
  const location = useLocation();
  const AppData = useAppData();
  const navigate = useNavigate();
  const { routes } = AppData;
  let { userInfo } = useModel('userInfo');

  return (
    <PageContainer extra={[<div key={'user'}>用户名：{userInfo.user_name}</div>]}>
      <Outlet />
    </PageContainer>
  );
};
export default TzPageContainer;
