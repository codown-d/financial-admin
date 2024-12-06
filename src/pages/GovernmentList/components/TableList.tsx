import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import { financialUserDelete, financialUserList, governmentDepartmentUserDelete, governmentUserList } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Link, useNavigate, useSearchParams } from '@umijs/max';
import { Button } from 'antd';



export default (props: { uid: any; }) => {
  let{uid}=props
  const navigate = useNavigate();
  const columns: ProColumns<any>[] = [
    {
      title: '账号',
      dataIndex: 'user_name',
    },
    {
      title: '密码',
      dataIndex: 'user_pass.view',
    },
    {
      title: '联系电话',
      dataIndex: 'user_name',
    },
    {
      title: '添加时间',
      dataIndex: 'add_time',
      valueType: 'dateTime',
    },
  
    {
      title: '操作',
      key: 'option',
      render: (text, record, _, action) => [
        <TzButton type="link" key={'edit'}>
          <Link to={`/customer/financial-list/user-info?id=${record.id}&fo_id=${uid}`}>
            编辑
          </Link>
        </TzButton>,
        <TzPopconfirm
          description="确认删除此账号?"
          key={'del'}
          onConfirm={() => {
            governmentDepartmentUserDelete({ id: record.id }).then((res) => {
              action?.reload();
            });
          }}
        >
          <TzButton type="link" danger onClick={() => {}}>
            删除
          </TzButton>
        </TzPopconfirm>,
      ],
    },
  ];
  return (
    <ProTable<any>
      columns={columns}
      request={async (params, sorter, filter) => {
        const res = await governmentUserList({ fo_id: uid });
        return {
          success: true,
          data: res?.dataList || [],
          total: res?.count || 0,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={false}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      toolBarRender={() => [
        <Button
          key="button"
          disabled={!uid}
          icon={<PlusOutlined />}
          onClick={() => {
            navigate(`/customer/financial-list/user-info?fo_id=${uid}`);
          }}
          type="primary"
        >
          添加账号
        </Button>,
      ]}
    />
  );
};
