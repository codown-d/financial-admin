import { TzButton } from '@/components/TzButton';
import TzTitleDesc from '@/components/TzTitleDesc';
import { InfoCircleFilled } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Col, ConfigProvider, message, Modal, Row } from 'antd';
import FinanceTable from './components/FinanceTable';
import ProductTable from './components/ProductTable';
import { adminUpdateInfo, adminUserLogout, getUserInfo } from '@/services';
import { useModel, useSearchParams } from '@umijs/max';
import Certify from '@/components/UI/Certify';
import { useState } from 'react';
export default () => {
  let [userInfo,setUserInfo] = useState({realname_name:'',verify_status:'1',enterprise_name:'',enterprise_verify_status:'1'});
 
  let [searchParams] = useSearchParams(); 
  let uid = searchParams.get('id');
  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      content: '是否确认注销此账号？',
      onOk: ()=>{
        adminUserLogout({uid}).then((res)=>{
          message.success('注销成功')
        })
      },
      okText: '确认',
      cancelText: '取消',
    });
  };
  return (
    <>
    {contextHolder}
      <ProForm
        onFinish={async (values) => {
          const response = await adminUpdateInfo({...values,uid})          
          console.log(response);
          message.success('提交成功');
        }}
        request={async () => {
          if (uid) {
            let {data} = await getUserInfo({query_uid:uid});
            console.log(data);
            setUserInfo(data)
            return { ...data };
          } else {
            return { };
          }
        }}
        layout={'horizontal'}
        labelCol={{ flex: '100px' }}
        wrapperCol={{ flex: '360px' }}
        colon={false}
      >
        <TzTitleDesc title={'客户信息'} className="mt-1" />
        <Row>
          <Col span={8}>
            <ProFormText name="user_name" label="账号" placeholder="请输入账号" />
          </Col>
          <Col span={8}>
            <ProFormText
              disabled
              name={'area_desc'}
              label="地区"
              placeholder="请输入地区"
            />
          </Col>
          <Col span={8}>
            <ProForm.Item name={'text'} label={'实名认证'}>
            <Certify title={userInfo?.realname_name} key={userInfo.realname_name} status={userInfo.verify_status} />
            </ProForm.Item>
          </Col>
          <Col span={8}>
            <ProFormText name={'user_pass_view'} label="密码" placeholder="请输入密码" />
          </Col>
          <Col span={8}>
            <ProFormText
              disabled
              name={'add_time_desc'}
              label="注册时间"
              placeholder="请输入注册时间"
            />
          </Col>
          <Col span={8}>
            <ProForm.Item
              name={'text'}
              label={'企业认证'}
              wrapperCol={{ span: 8 }}
            >
             <Certify title={userInfo?.enterprise_name} key={userInfo.enterprise_name} status={userInfo.enterprise_verify_status} />
           
            </ProForm.Item>
          </Col>
        </Row>
        <TzTitleDesc title={'一键融资'} className="mt-4 mb-5" />
        <FinanceTable />

        <TzTitleDesc title={'产品申请'} className="mt-10 mb-5" />
        <ProductTable />
        <TzTitleDesc title={'注销账号'} className="mt-10 mb-5" />
        <div className="mb-[70px] text-[#999999] text-[12px]">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: '#EEEEEE',
                },
              },
            }}
          >
            <TzButton onClick={confirm}>注销账号</TzButton>
          </ConfigProvider>
          <InfoCircleFilled className="ml-5 mr-1" />
          注销后账号不可找回
        </div>
      </ProForm>
    </>
  );
};
