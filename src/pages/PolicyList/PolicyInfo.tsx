import MyEditor from '@/components/MyEditor';
import TzTitleDesc from '@/components/TzTitleDesc';
import { AREA_TYPE, BODY_TYPE } from '@/constants';
import { policyDetail, policySave } from '@/services';
import { formatOption } from '@/utils';
import {
  ProForm,
  ProFormContext,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel, useNavigate, useSearchParams } from '@umijs/max';
import { Col, Form, message, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import dayjs from 'dayjs';
export default () => {
  let [searchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  let { theme, feature } = useModel('policy');
  console.log(feature)
  let { interpretation } = useModel('policyInterpretation');
  let id = searchParams.get('id');
  const [form] = Form.useForm();
  const navigate = useNavigate();
  return (
    <>
      {contextHolder}
      <ProForm
        form={form}
        onFinish={async (values) => {
          let res = await policySave(values); 
          if(res.code==200){
            message.success('提交成功'); 
            navigate(-1)
          }
        }}
        request={async () => {
          if (id) {
            let res = await policyDetail({ id });
            return {
              ...res.data,
              theme_id:res.data.theme_id!==0?res.data.theme_id:undefined,
              feature_id:res.data.feature_id!==0?res.data.feature_id:undefined
            };
          } else {
            return {
              add_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
              name="title"
              label="标题"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="area_type"
              rules={[{ required: true }]}
              label="层级"
              fieldProps={{
                options: formatOption(AREA_TYPE),
              }}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name={'theme_id'}
              label={'主题'}
              fieldProps={{
                options: formatOption(theme),
              }}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name={'feature_id'}
              label={'特色'}
              valueEnum={feature}
              // fieldProps={{
              //   options: formatOption(feature),
              // }}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name={'body_type'}
              label="类型"
              rules={[{ required: true }]}
              fieldProps={{
                options: formatOption(BODY_TYPE),
              }}
            />
          </Col>
          <Col span={8}>
            <ProFormText name={'sub_title'} label="政策来源" />
          </Col>
          <Col span={8}>
            <ProFormDateTimePicker
              width={'md'}
              name={'add_time'}
              disabled
              label="发布时间"
            />
          </Col>
          <Col span={8}>
            <ProFormText name={'summary'} label="摘要" 
              rules={[{ required: true }]}/>
          </Col>
          <Col span={8}>
            <ProFormText
              name={'interpret'}
              label="关联解读"
            />
          </Col>
        </Row>
        <TzTitleDesc title={'正文内容'} className="mt-4 mb-5" />
        <FormItem name={'body'} rules={[{ required: true,message:'请输入正文内容' }]}>
          <MyEditor className={'mb-[60px]'} />
        </FormItem>
      </ProForm>
    </>
  );
};
