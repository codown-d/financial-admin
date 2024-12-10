import TzTitleDesc from '@/components/TzTitleDesc';
import { useAreaData } from '@/hooks';
import {
  governmentDepartmentDetail,
  governmentDepartmentSave,
} from '@/services';
import { refreshPageUrl, urlToBase64 } from '@/utils';
import {
  ProForm,
  ProFormCascader,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Col, message, Row } from 'antd';
import { Form } from 'antd/lib';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import TableList from './components/TableList';
import FormItem from 'antd/lib/form/FormItem';
export default () => {
  let [searchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  let { areaData } = useAreaData();
  let [id, setUid] = useState(searchParams.get('id'));
  const [fileList, setFileList] = useState<any[]>([]);
  const logo = Form.useWatch('logo', form);
  useEffect(() => {
    if (!logo || logo.length == 0) return;
    let { url } = logo[0];
    urlToBase64(url, (thumbUrl) => {
      setFileList([
        {
          status: 'done',
          url: url,
          thumbUrl: thumbUrl,
        },
      ]);
    });
  }, [logo]);
  return (
    <>
      {contextHolder}
      <ProForm
        form={form}
        onFinish={async (values) => {
          let res = await governmentDepartmentSave({
            ...values,
            logo: values.logo?.[0]?.response.file,
            prov_id: values.area_id?.[0],
            city_id: values.area_id?.[1],
            area_id: values.area_id?.[2],
          });
          refreshPageUrl('id', res.id);
          setUid(res.id);
          messageApi.success('提交成功');
        }}
        request={async () => {
          if (id) {
            let { data } = await governmentDepartmentDetail({ id });
            return {
              ...data,
              area_id: [data.prov_id, data.city_id, data.area_id],
              logo: data.logo ? [data.logo] : undefined,
            };
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
            <ProFormText name="id" hidden />
            <ProFormText
              name="organs_name"
              label="政府名称"
              placeholder="请输入政府名称"
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={8}>
            <ProFormCascader
              name={'area_id'}
              label="地区"
              fieldProps={{ options: areaData }}
              rules={[{ required: true, message: '请选择地区' }]}
            />
          </Col>
          <Col span={8}>
            <ProFormDateTimePicker
              disabled
              name={'add_time'}
              label="添加时间"
              placeholder="请输入注册时间"
            />
          </Col>
          <Col span={8}>
            <ProFormTextArea
              name={'address'}
              label="详细地址"
              placeholder="请输入详细地址"
            />
          </Col>
        </Row>

        <TzTitleDesc title={'账号信息'} className="mt-4 mb-5" />
        <TableList uid={id} />
      </ProForm>
    </>
  );
};
