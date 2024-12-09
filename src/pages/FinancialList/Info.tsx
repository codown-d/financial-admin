import TzTitleDesc from '@/components/TzTitleDesc';
import { useAreaData } from '@/hooks';
import { financialDetail, financialSave } from '@/services';
import { formatKey, refreshPageUrl, urlToBase64 } from '@/utils';
import {
  ProForm,
  ProFormCascader,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Col, message, Row } from 'antd';
import { Form } from 'antd/lib';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import TableList from './components/TableList';
import { organs_data_type } from '@/constants';

export default () => {
  let [searchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  let { areaData } = useAreaData();
  let [id ,setUid]=useState(searchParams.get('id'))
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
  console.log(API_BASE_URL)
  return (
    <>
      {contextHolder}
      <ProForm
        form={form}
        onFinish={async (values) => {
          console.log(values)
          let res = await financialSave({
            ...values,
            logo: values.logo?.[0]?.response?.file,
            prov_id: values.area_id?.[0],
            city_id: values.area_id?.[1],
            area_id: values.area_id?.[2],
          });
          messageApi.success('提交成功');
          refreshPageUrl('id', res.id);
          setUid(res.id)
        }}
        request={async () => {
          if (id) {
            let { data } = await financialDetail({ id });
            console.log(data,{
              data_type:data.data_type+'',})
            return {
              ...data,
              data_type:data.data_type+'',
              area_id: [data.prov_id, data.city_id, data.area_id],
              logo: data.logo
                ? [
                    {
                      status: 'done',
                      url: data.logo,
                      thumbUrl: '',
                    },
                  ]
                : undefined,
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
            <Col span={24}>
              <ProFormText name="id" hidden />
              <ProFormUploadButton
                accept=".jpg,.jpeg,.png"
                extra="支持扩展名：.jpg .png .jpeg"
                label="企业LOGO"
                name="logo"
                fieldProps={{
                  name: 'image',
                  showUploadList: true,
                  multiple: false,
                  onChange: ({ fileList }) => {
                    let arr = fileList.map((item) => {
                      return {
                        ...item,
                        url: item?.response?.file,
                      };
                    });
                    setFileList(arr);
                  },
                }}
                max={1}
                value={fileList}
                listType="picture-card"
                title="上传文件"
                action={`${API_BASE_URL}/upload/image`}
              />
              <ProFormText
                name="organs_name"
                label="机构名称"
                placeholder="请输入机构名称"
                  rules={[{ required: true}]}
              />
            </Col>
          </Col>
          <Col span={16}>
            <Row>
            <Col span={12}>
                <ProFormSelect
                  name={'data_type'}
                  label="机构类型"
                  valueEnum={organs_data_type}
                  rules={[{ required: true}]}
                />
              </Col>
              <Col span={12}>
                <ProFormCascader
                  name={'area_id'}
                  label="地区"
                  fieldProps={{ options: areaData }}
                  rules={[{ required: true,message:'请选择地区'}]}
                />
              </Col>
              <Col span={12}>
                <ProFormTextArea
                  name={'address'}
                  label="详细地址"
                  placeholder="请输入详细地址"
                />
              </Col>
              <Col span={12}>
                <ProFormDateTimePicker
                  disabled
                  name={'add_time'}
                  label="添加时间"
                  placeholder="请输入注册时间"
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <TzTitleDesc title={'账号信息'} className="mt-4" />
        <TableList uid={id}/>
      </ProForm>
    </>
  );
};
