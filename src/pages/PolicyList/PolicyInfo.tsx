import MyEditor from '@/components/MyEditor';
import TzTitleDesc from '@/components/TzTitleDesc';
import { AREA_TYPE, BODY_TYPE } from '@/constants';
import { policyDetail, policySave } from '@/services';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel, useSearchParams } from '@umijs/max';
import { Col, message, Row } from 'antd';
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
  let { theme, feature } = useModel('policy');
  return (
    <>
      {contextHolder}
      <ProForm
        onFinish={async (values) => {
          await policySave(values);
          console.log(values);
          messageApi.success('提交成功');
        }}
        request={async () => {
          let id = searchParams.get('id');
          if (id) {
            await policyDetail({ id });
            return {
              name: '蚂蚁设计有限公司',
              useMode: 'chapter',
            };
          } else {
            return {
              name: '蚂蚁设计有限公司',
              useMode: 'chapter',
            }
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
            <ProFormSelect
              name="area_type"
              label="层级"
              valueEnum={AREA_TYPE}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect name={'theme_id'} label={'主题'} valueEnum={theme} />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name={'feature_id'}
              label={'特色'}
              valueEnum={feature}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name={'body_type'}
              label="类型"
              valueEnum={BODY_TYPE}
            />
          </Col>
          <Col span={8}>
            <ProFormText name={'sub_title'} label="政策来源" />
          </Col>
          <Col span={8}>
            <ProFormDateTimePicker
              width={'md'}
              name={'add_time'}
              label="发布时间"
              // transform={(value) => {
              //   console.log(value)
              //   return {
              //     start: value[0],
              //     end: value[1],
              //   };
              // }}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect name={'interpret'} label="关联解读" />
          </Col>
        </Row>
        <TzTitleDesc title={'正文内容'} className="mt-4 mb-5" />
        <MyEditor className={'mb-[60px]'} />
      </ProForm>
    </>
  );
};
