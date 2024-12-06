import TzTitleDesc from '@/components/TzTitleDesc';
import { financialDetail } from '@/services';
import {
  ProForm,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Col, Form, message, Row } from 'antd';
import { useCallback, useEffect } from 'react';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let getFinanceInfo = useCallback(() => {
    console.log(searchParams);
    financialDetail({ id: searchParams.get('id') }).then((res) => {
      console.log(res);
    });
  }, [searchParams]);
  useEffect(() => {
    getFinanceInfo();
  }, []);
  const [form] = Form.useForm();
  return (
    <>
      <ProForm
        form={form}
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
        <TzTitleDesc title={'机构/部门选择'} className="mt-1 mb-5" />
        <ProFormText name="name" label="机构/部门" placeholder="请输入账号" />
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
              placeholder="请输入账号"
            />
          </Col>
          <Col span={8}>
            <ProFormText name={'name2'} label="密码" placeholder="请输入密码" />
          </Col>
          <Col span={8}>
            <ProFormText
              disabled
              name={'name2'}
              label="联系方式"
              placeholder="请输入注册时间"
            />
          </Col>
        </Row>
      </ProForm>
    </>
  );
};
