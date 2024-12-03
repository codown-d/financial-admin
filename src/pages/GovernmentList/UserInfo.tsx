import TzTitleDesc from '@/components/TzTitleDesc';
import { useAreaData } from '@/hooks';
import { financialDetail, financialSave, financialUserDetail, governmentUserDetail, governmentUserSave } from '@/services';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormText,
} from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Col, message, Row } from 'antd';
import { Form } from 'antd/lib';
import dayjs from 'dayjs';

export default () => {
  let [searchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  return (
    <>
      {contextHolder}
      <ProForm
        form={form}
        onFinish={async (values) => {
          await governmentUserSave({
            ...values,
          });
          messageApi.success('提交成功');
        }}
        request={async () => {
          let id = searchParams.get('id');
          if (id) {
            let { data } = await governmentUserDetail({ id });
            return {
              ...data,
            };
          } else {
            return {
              id: 0,
              add_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            };
          }
        }}
        layout={'horizontal'}
        labelCol={{ flex: '100px' }}
        wrapperCol={{ flex: '360px' }}
        colon={false}
      >
        <TzTitleDesc title={'基本信息'} className="mt-1 mb-5" />
        <Row>
          <Col span={8}>
            <ProFormText name="id" hidden />
            <ProFormText name="fo_id" hidden />
            <ProFormText
              name="user_name"
              label="账号"
              placeholder="请输入账号"
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name={'user_pass'}
              label="密码"
              placeholder="请输入密码"
            />
          </Col>
          <Col span={8}>
            <ProFormDateTimePicker
              disabled
              name={'add_time'}
              label="添加时间"
              placeholder="请输入注册时间"
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name={'name2'}
              label="联系方式"
              placeholder="请输入联系方式"
            />
          </Col>
        </Row>
      </ProForm>
    </>
  );
};
