import TzTitleDesc from '@/components/TzTitleDesc';
import { fundDetail, fundSave, insuranceDetail, insuranceSave, loanDetail, loanSave } from '@/services';
import {
  ProForm,
  ProFormDateTimePicker,
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
          await loanSave({product_type:6,...values});
          console.log(values);
          messageApi.success('提交成功');
        }}
        request={async () => {
          let id = searchParams.get('id');
          if (id) {
            let res = await loanDetail({ id,product_type:6, });
            return { ...res };
          } else {
            return {
              add_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              subscription_unit:'1'
            };
          }
        }}
        layout={'horizontal'}
        labelCol={{ flex: '100px' }}
        colon={false}
      >
        <TzTitleDesc title={'基本信息'} className="mt-1" />
        <ProFormText name="id" hidden />
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
          <Flex>
              <Form.Item  name={'subscription_money'} label='认缴规模' rules={[{ required: true, message: '请输入认缴规模' }]}>
                <InputNumber style={{ width: 200 }} placeholder="请输入" />
              </Form.Item>
              <Form.Item noStyle name={'subscription_unit'}>
                <Select style={{ width: 80, }} className='!ml-[36px]'>
                  <Select.Option value="1">万元</Select.Option>
                  <Select.Option value="2">亿元</Select.Option>
                </Select>
              </Form.Item></Flex>
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
              name={'application_condition'}
              label="公司简介"
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      </ProForm>
    </>
  );
};
