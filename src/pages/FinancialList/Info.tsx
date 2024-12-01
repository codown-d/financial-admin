import TzTitleDesc from '@/components/TzTitleDesc';
import { financialDetail, financialSave } from '@/services';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTimePicker,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Col, message, Row } from 'antd';
import TableList from './components/TableList';
import { Form } from 'antd/lib';
import dayjs from 'dayjs';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
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
          await financialSave(values);
          messageApi.success('提交成功');
        }}
        request={async () => {
          let id = searchParams.get('id');
          if (id) {
            let res = await financialDetail({ id });
            console.log(res)
            return { ...res.data };
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
        <TzTitleDesc title={'机构/部门选择'} className="mt-1 mb-5" />
        <ProFormText name="organs_name" label="机构/部门" placeholder="请输入账号" />
        <TzTitleDesc title={'账号信息'} className="mt-4 mb-5 " />
        <ProFormUploadButton
          accept=".jpg,.jpeg,.png"
          extra="支持扩展名：.jpg .png .jpeg"
          label="企业LOGO"
          name="file"
          listType="picture-card"
          title="上传文件"
        />
        <Row>
          <Col span={8}>
            <ProFormText
              disabled
              name={'name2'}
              label="账号"
              placeholder="请输入地区"
            />
          </Col>
          <Col span={8}>
            <ProFormText name={'name2'} label="密码" placeholder="请输入密码" />
          </Col>
          <Col span={8}>
            <ProFormDateTimePicker
              disabled
              name={'add_time'}
              label="添加时间"
              placeholder="请输入注册时间"
            />
          </Col>
        </Row>
        <TzTitleDesc title={'账号信息'} className="mt-4 mb-5" />
        <TableList />
      </ProForm>
    </>
  );
};
