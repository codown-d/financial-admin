import TzTitleDesc from '@/components/TzTitleDesc';
import { useAreaData } from '@/hooks';
import { financialDetail, financialSave, governmentDepartmentDetail, governmentDepartmentSave } from '@/services';
import {
  ProForm,
  ProFormCascader,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Col, message, Row } from 'antd';
import { Form } from 'antd/lib';
import dayjs from 'dayjs';
import TableList from './components/TableList';
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
  const [form] = Form.useForm();
  let { areaData } = useAreaData();
  return (
    <>
      {contextHolder}
      <ProForm
        form={form}
        onFinish={async (values) => {
          await governmentDepartmentSave({...values,logo:values.logo?.[0],area_id:values.area_id?.[2]});
          messageApi.success('提交成功');
        }}
        request={async () => {
          let id = searchParams.get('id');
          if (id) {
            let { data } = await governmentDepartmentDetail({ id });
            return {
              ...data,
              area_id: [data.prov_id, data.city_id, data.area_id],
              logo:data.logo?[data.logo]:undefined
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
                  multiple:false,
                  onChange: ({ fileList }) => {
                    const uploadedFile =  (Array.isArray(fileList) ? fileList : []).find(file => file.status === 'done');
                    console.log(uploadedFile)
                    if (uploadedFile && uploadedFile?.response) {
                      console.log(uploadedFile,uploadedFile.response.file)
                      form.setFieldsValue({
                        logo: [uploadedFile.response.file], // 假设返回值中包含 url 字段
                      });
                    }
                  },
                }}
                max={1}
                listType="picture-card"
                title="上传文件"
                action={`${process.env.UMI_APP_API_BASE_URL}/upload/image`}
              />
              <ProFormText
                name="organs_name"
                label="机构名称"
                placeholder="请输入机构名称"
              />
            </Col>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={12}>
                <ProFormCascader
                  name={'area_id'}
                  label="地区"
                  fieldProps={{ options: areaData }}
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
              <Col span={12}>
                <ProFormTextArea
                  name={'name2'}
                  label="详细地址"
                  placeholder="请输入详细地址"
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <TzTitleDesc title={'账号信息'} className="mt-4 mb-5" />
        <TableList />
      </ProForm>
    </>
  );
};
