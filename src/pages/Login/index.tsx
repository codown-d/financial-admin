import { TzButton } from '@/components/TzButton';
import TzCard from '@/components/TzCard';
import TzImage from '@/components/TzImage';
import { adminLogin } from '@/services';
import { storage } from '@/utils/storage';
import { ProForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useRef } from 'react';

const Login: React.FC = () => {
  const { name } = useModel('global');

  const formRef = useRef();
  return (
    <div
      className="bg-cover bg-center h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/login-bg.png')",
        backgroundSize: 'cover',
      }}
    >
      <div className="relative flex items-start justify-around w-full">
        <img src="/images/dlpt.png" alt="" />
        <TzCard className=" w-[400px] px-4 py-9">
          <h1 className=" text-2xl font-semibold mb-[76px]">欢迎登录</h1>
          <ProForm
            onFinish={async (values) => {
              console.log(values)
              let res = await adminLogin(values)
              console.log(123,res)
              storage.setCookie('token',res.token);  
              // storage.setCookie('userInfo',res.userInfo);
              window.location.href = '/'
            }}
            formRef={formRef}
            autoFocusFirstInput
            submitter={{
              render: (_, dom) => (
                <TzButton type="primary" size={'large'} htmlType="submit" block>
                  登录
                </TzButton>
              ),
            }}
          >
            <ProFormText
              name="user_name"
              placeholder="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            />
            <ProFormText.Password
              name="user_pass"
              placeholder="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            />
             <ProFormCheckbox name="password">记住密码</ProFormCheckbox>
          </ProForm>
        </TzCard>
      </div>
    </div>
  );
};

export default Login;
