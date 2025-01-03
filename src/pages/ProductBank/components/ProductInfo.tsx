import TzTitleDesc from '@/components/TzTitleDesc';
import { data_type, repayment_method, termC, termOp } from '@/constants';
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
import { useModel, useNavigate, useSearchParams } from '@umijs/max';
import { Col, Form, message, Row } from 'antd';
import dayjs from 'dayjs';

export default (props: { product_type: any }) => {
  let { product_type } = props;
  let [searchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  let { financialOrg } = useModel('financialOrg');
  const [form] = Form.useForm();
  const application_form = Form.useWatch('application_form', form);
  const navigate = useNavigate();
  return (
    <>
      {contextHolder}
      <ProForm
        form={form}
        onFinish={async (values) => {
          let res = await loanSave(values);
          
          if(res.code==200){
            message.success('提交成功'); 
            navigate(-1)
          }
        }}
        request={async () => {
          let id = searchParams.get('id');
          if (id) {
            let res = await loanDetail({ id, product_type });
            console.log(res.data.term_unit)
            return {
              ...res.data,
              term_unit:res.data.term_unit+''||1,
              ...formatKey(res.data, ['fo_id',  'application_form']),
            };
          } else {
            return {
              add_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              application_form: '4',
              highest_money_unit:2,
              id: 0,
              product_type,
              term_unit:1
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
        <ProFormText name="highest_money_unit" hidden />
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
            <ProFormDigit
              name={'rate'}
              fieldProps={{
                suffix: '%',
              }}
              label={'最低利率'}
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={8}>
            <Row>
              <Col span={18}>
                <ProFormDigit
                  name={'term'}
                  label={'最高期限'}
                  rules={[{ required: true }]}
                />
              </Col>
              <Col span={6}>
                <ProFormSelect
                  name={'term_unit'}
                  options={termOp}
                  fieldProps={{ className: '!w-[100%] !min-w-[50%]' }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <ProFormSelect
              name={'data_type'}
              label={'担保类型'}
              mode="multiple"
              valueEnum={data_type}
              rules={[{ required: true, message: '请选择担保类型' }]}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name={'repayment_method'}
              label={'还款方式'}
              mode="multiple"
              valueEnum={repayment_method}
              rules={[{ required: true, message: '请选择还款方式' }]}
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
              name={'service_object'}
              label="服务对象"
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              name={'application_condition'}
              label="申请条件"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              name="application_form"
              label="申请资料"
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
