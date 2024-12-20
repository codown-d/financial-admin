import TzTitleDesc from '@/components/TzTitleDesc';
import { data_type, GUARANTEE_FROM_OP, termC } from '@/constants';
import { loanDetail, loanSave } from '@/services';
import { formatKey } from '@/utils';
import {
  ProForm,
  ProFormCheckbox,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel, useNavigate, useSearchParams } from '@umijs/max';
import { Col, message, Row } from 'antd';
import dayjs from 'dayjs';
import { isArray } from 'lodash';

export default () => {
  let [searchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  let { financialOrg } = useModel('financialOrg');
  const navigate = useNavigate();
  return (
    <>
      {contextHolder}
      <ProForm
        onFinish={async (values) => {
          console.log(values)
          let res = await loanSave({ ...values, product_type: 7 ,guarantee_form:isArray(values.guarantee_form)?values.guarantee_form:[values.guarantee_form]});
        
          if(res.code==200){
            message.success('提交成功'); 
            navigate(-1)
          }
        }}
        request={async () => {
          let id = searchParams.get('id');
          if (id) {
            let res = await loanDetail({ id, product_type: 7 });
            return {
              ...res.data,
               term_unit:res.data.term_unit+''||'1',
              ...formatKey(res.data, ['fo_id','guarantee_form','data_type']),
            };
          } else {
            return {
              add_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              term_unit:'1'
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
              name={'rate'}
              label={'费率'}
              fieldProps={{
                suffix: '%', // 添加后缀
              }}
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={8}>
              <Row>
              <Col span={20}>
                <ProFormDigit
                  name={'term'}
                  label={'担保期限'}
                  rules={[{ required: true }]}
                />
              </Col>
              <Col span={4}>
                <ProFormSelect
                  name={'term_unit'}
                  valueEnum={termC}
                  fieldProps={{ className: '!w-[100%] !min-w-[50%]' }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <ProFormCheckbox.Group
              name={'guarantee_form'}
              label="保函形式"
              options={GUARANTEE_FROM_OP}
              rules={[{ required: true, message: '请选择保函形式' }]}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name={'data_type'}
              label="担保方式"
              fieldProps={{
                mode:"multiple"
              }}
              valueEnum={data_type}
              rules={[{ required: true, message: '请选择担保方式' }]}
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
              name={'application_condition'}
              label="申请条件"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormTextArea
              name={'service_object'}
              label="服务对象"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormTextArea
              name={'application_info'}
              label="申请资料"
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      </ProForm>
    </>
  );
};
