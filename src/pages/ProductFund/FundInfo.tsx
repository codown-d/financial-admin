import TzTitleDesc from '@/components/TzTitleDesc';
import { fundDetail, fundSave, loanDetail, loanSave } from '@/services';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel, useSearchParams } from '@umijs/max';
import { Col, Flex, Form, InputNumber, message, Row, Select } from 'antd';
import dayjs from 'dayjs';

export default () => {
  let [searchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  let { financialOrg } = useModel('financialOrg');
  return (
    <>
      {contextHolder}
      <ProForm
        onFinish={async (values) => {
          await loanSave({product_type: 5,highest_money_unit:1,...values});
          console.log(values);
          messageApi.success('提交成功');
        }}
        request={async () => {
          let id = searchParams.get('id');
          if (id) {
            let res = await loanDetail({ product_type: 5,id });
            return { ...res };
          } else {
            return {
              add_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              subscription_unit:'1',
              product_type:5
            };
          }
        }}
        layout={'horizontal'}
        labelCol={{ flex: '100px' }}
        colon={false}
      >
        <TzTitleDesc title={'基本信息'} className="mt-1" />
        <ProFormText name="id" hidden />
        <ProFormText name="product_type" hidden />
        <Row>
          <Col span={8}>
            <ProFormText
              name="name"
              label="基金名称"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name={'fo_id'}
              label={'金融机构'}
              valueEnum={financialOrg}
              rules={[{ required: true, message: '请选择金融机构' }]}
            />
          </Col>
          <Col span={8}>
          <ProFormDigit
              name={'highest_money'}
              fieldProps={{
                suffix: '万元',
              }}
              label={'最高额度'}
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={8}>
            <ProFormDateTimePicker
              width={'md'}
              name={'add_time'}
              disabled
              label="添加时间"
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
        <TzTitleDesc title={'详细信息'} className="mt-4 mb-5" />
        <Row>
          <Col span={12}>
            <ProFormTextArea
              name={'product_intro'}
              label="产品介绍"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormTextArea
              name={'fund_company_intro'}
              label="公司简介"
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      </ProForm>
    </>
  );
};
