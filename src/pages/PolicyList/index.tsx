import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import { AREA_TYPE, BODY_TYPE } from '@/constants';
import { policyDelete, policyList } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Access, useAccess, useModel, useNavigate } from '@umijs/max';
import { Button } from 'antd';
import { useMemo, useRef, useState } from 'react';
type GithubIssueItem = {
  id: number;
  account: string;
  password: string;
  reg_time: string;
  region: string;
  real_name: string;
  certification: string;
};

export default () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  let { theme, feature } = useModel('policy');
  const [total, setTotal] = useState(0);
  let headerTitle = useMemo(() => {
    return `共 ${total} 条数据`;
  }, [total]);

  const access = useAccess();
  const columns: ProColumns<GithubIssueItem>[] = useMemo(
    () => [
      {
        title: '标题',
        dataIndex: 'keyword',
        hideInTable: true,
      },
      {
        title: '标题',
        dataIndex: 'title',
        hideInSearch: true,
        ellipsis: true,
      },

      {
        title: '层级',
        dataIndex: 'area_type',
        valueType: 'select',
        valueEnum: AREA_TYPE,
      },
      {
        title: '类型',
        dataIndex: 'body_type',
        valueType: 'select',
        valueEnum: BODY_TYPE,
      },
      {
        title: '政策来源',
        dataIndex: 'sub_title',
        ellipsis: true,
        order: -1,
      },
      {
        title: '主题',
        dataIndex: 'theme_id',
        valueType: 'select',
        valueEnum: theme,
      },
      {
        title: '特色',
        dataIndex: 'feature_id',
        valueType: 'select',
        valueEnum: feature,
      },

      {
        title: '发布时间区间',
        dataIndex: 'created_at',
        hideInTable: true,
        valueType: 'dateRange',
        order: -2,
        search: {
          transform: (value) => {
            return {
              start: value[0],
              end: value[1],
            };
          },
        },
      },
      {
        title: '发布时间',
        dataIndex: 'add_time',
        hideInSearch: true,
        valueType: 'dateTime',
      },

      {
        title: '操作',
        fixed: 'right',
        align: 'center',
        hideInTable: !access.canEdit,
        hideInSearch: true,
        render: (text, record, _, action) => [
          <TzButton
            type="link"
            key={'edit'}
            onClick={() => {
              navigate(`/policy/list/policy-info?id=${record.id}`);
            }}
          >
            编辑
          </TzButton>,
          <TzPopconfirm
            description="确认删除政策?"
            key={'del'}
            onConfirm={() => {
              action?.reload();
              return;
              policyDelete({ id: record.id }).then((res) => {
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
    ],
    [],
  );
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sorter, filter) => {
        const res = await policyList({
          ...params,
        });
        setTotal(res.count);
        return {
          success: true,
          data: res.dataList,
          total: res.count,
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
              created_at: [values.start, values.end],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      headerTitle={headerTitle}
      toolBarRender={() => [
        <Access accessible={access.canEdit}>
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              // actionRef.current?.reload();
              navigate(`/policy/list/policy-info`);
            }}
            type="primary"
          >
            添加
          </Button>
        </Access>,
      ]}
    />
  );
};
