import { TzButton } from '@/components/TzButton';
import TzTitleDesc from '@/components/TzTitleDesc';
import { InfoCircleFilled } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Col, ConfigProvider, message, Row } from 'antd';
import FinanceTable from './components/FinanceTable';
import ProductTable from './components/ProductTable';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default () => {
  return (
    <>
      <ProForm
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
        }}
        initialValues={{
          name: '蚂蚁设计有限公司',
          name2: '蚂蚁设计集团',
          useMode: 'chapter',
        }}
        layout={'horizontal'}
        labelCol={{ flex: '100px' }}
        wrapperCol={{ flex: '360px' }}
        colon={false}
      >
        <TzTitleDesc title={'客户信息'} className="mt-1" />
        <Row>
          <Col span={8}>
            <ProFormText name="name" label="账号" placeholder="请输入账号" />
          </Col>
          <Col span={8}>
            <ProFormText
              disabled
              name={'name2'}
              label="地区"
              placeholder="请输入地区"
            />
          </Col>
          <Col span={8}>
            <ProForm.Item name={'text'} label={'实名认证'}>
              <div>123</div>
            </ProForm.Item>
          </Col>
          <Col span={8}>
            <ProFormText name={'name2'} label="密码" placeholder="请输入密码" />
          </Col>
          <Col span={8}>
            <ProFormText
              disabled
              name={'name2'}
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
              <div>123</div>
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
            <TzButton>注销账号</TzButton>
          </ConfigProvider>
          <InfoCircleFilled className="ml-5 mr-1" />
          注销后账号不可找回
        </div>
      </ProForm>
    </>
  );
};
