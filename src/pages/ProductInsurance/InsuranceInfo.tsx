import TzTitleDesc from '@/components/TzTitleDesc';
import { insurance_type } from '@/constants';
import { loanDetail, loanSave } from '@/services';
import { formatKey } from '@/utils';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel, useSearchParams } from '@umijs/max';
import { Col, Form, message, Row } from 'antd';
import dayjs from 'dayjs';

export default () => {
  let [searchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  let { financialOrg } = useModel('financialOrg');
  const [form] = Form.useForm();
  const application_form = Form.useWatch('application_form', form);

  return (
    <>
      {contextHolder}
      <ProForm
        form={form}
        onFinish={async (values) => {
          await loanSave({ product_type: 6, ...values });
          console.log(values);
          messageApi.success('提交成功');
        }}
        request={async () => {
          let id = searchParams.get('id');
          if (id) {
            let res = await loanDetail({ id, product_type: 6 });
            return {
              ...res,
              ...formatKey(res.data, [
                'fo_id',
                'data_type',
                'repayment_method',
                'application_form',
              ]),
            };
          } else {
            return {
              add_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              id: 0,
              application_form: '4',
              product_type: 6,
            };
          }
        }}
        layout={'horizontal'}
        labelCol={{ flex: '100px' }}
        colon={false}
      >
        <TzTitleDesc title={'基本信息'} className="mt-1 mb-3" />
        <ProFormText name="id" hidden />
        <ProFormText name="product_type" hidden />
        <Row>
          <Col span={8}>
            <ProFormText
              name="name"
              label="产品名称"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="data_type"
              label="类型"
              valueEnum={insurance_type}
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
            <ProFormText
              name={'highest_money_unit'}
              label={'单位'}
              initialValue={1}
              hidden
            />
            <ProFormDigit
              name={'highest_money'}
              label={'保额'}
              fieldProps={{
                suffix: '元',
              }}
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              name={'term'}
              label={'期限'}
              fieldProps={{
                suffix: '月',
              }}
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
            <ProFormTextArea
              name={'application_condition'}
              label="公司简介"
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              name={'service_object'}
              label="服务对象"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              name="application_form"
              label="申请方式"
              style={{ width: '200px' }}
              valueEnum={{
                '1': '不区分',
                '2': '企业',
                '3': '个人',
                '4': '区分企业/个人',
              }}
            />

            <div className="ml-[100px]">
              {application_form != 1 ? (
                <>
                  {application_form != 3 ? (
                    <ProFormTextArea
                      name={'application_info_enterprise'}
                      placeholder={'请输入企业 相关的申请资料'}
                      rules={[{ required: true }]}
                    />
                  ) : null}
                  {application_form != 2 ? (
                    <ProFormTextArea
                      name={'application_info_user'}
                      placeholder={'请输入个人 相关的申请资料'}
                      rules={[{ required: true }]}
                    />
                  ) : null}
                </>
              ) : (
                <ProFormTextArea
                  name={'application_info'}
                  placeholder={'请输入贷款申请资料'}
                  rules={[{ required: true }]}
                />
              )}
            </div>
          </Col>
        </Row>
      </ProForm>
    </>
  );
};
