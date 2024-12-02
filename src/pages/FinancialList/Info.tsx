import TzTitleDesc from '@/components/TzTitleDesc';
import { financialDetail, financialSave } from '@/services';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Col, message, Row } from 'antd';
import { Form } from 'antd/lib';
import dayjs from 'dayjs';
import TableList from './components/TableList';
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
            console.log(res);
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
        <TzTitleDesc title={'基本信息'} className="mt-1 mb-5" />
        <Row>
          <Col span={8}>
            <ProFormUploadButton
              accept=".jpg,.jpeg,.png"
              extra="支持扩展名：.jpg .png .jpeg"
              label="企业LOGO"
              name="file"
              listType="picture-card"
              title="上传文件"
            />
          </Col>
          <Col span={8}></Col>
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
              name="organs_name"
              label="机构名称"
              placeholder="请输入机构名称"
            />
          </Col>
          <Col span={8}>
            <ProFormTextArea
              name={'name2'}
              label="详细地址"
              placeholder="请输入详细地址"
            />
          </Col>
        </Row>

        <TzTitleDesc title={'账号信息'} className="mt-4 mb-5" />
        <TableList />
      </ProForm>
    </>
  );
};
