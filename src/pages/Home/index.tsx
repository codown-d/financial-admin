import { TzButton } from '@/components/TzButton';
import { userList } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker } from 'antd';
import { useMemo, useRef } from 'react';

const { RangePicker } = DatePicker;
type GithubIssueItem = {
  id: number;
  account: string;
  password: string;
  reg_time: string;
  region: string;
  real_name: string;
  certification: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '账号',
    dataIndex: 'account',
    ellipsis: true,
    onFilter: true,
    order: 5,
  },
  {
    title: '密码',
    dataIndex: 'password',
    ellipsis: true,
    hideInSearch: true,
    render: () => '******',
  },
  {
    title: '地区',
    dataIndex: 'area',
    onFilter: true,
    order: 2,
  },
  {
    title: '实名认证',
    dataIndex: 'realAuth',
    formItemProps: {
      label: '认证方式',
    },
    order: 4,
  },

  {
    title: '企业认证',
    dataIndex: 'enterpriseAuth',
    formItemProps: {
      label: '公司名称',
    },
    order: 3,
  },
  {
    title: '操作',
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: (text, record, _, action) => (
      <TzButton
        type="link"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        查看
      </TzButton>
    ),
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  let headerTitle = useMemo(() => {
    return `共 123 条数据`;
  }, []);
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sorter, filter) => {
        const { data, success } = await userList({
          ...params,
        });
        return {
          data: data?.list || [],
          success,
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
        },
      }}
      rowKey="id"
      search={{
        span: 8,
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        labelWidth: 120,
        colon: false,
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
      }}
      headerTitle={headerTitle}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          添加
        </Button>,
      ]}
    />
  );
};
