import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import { SUB_UNIT } from '@/constants';
import { fundDelete, loanDelete, loanList } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Access, useAccess, useModel, useNavigate } from '@umijs/max';
import { Button, DatePicker } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { PriceInput } from './components/PriceInput';

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

export default () => {
  const [total, setTotal] = useState(0);
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  let headerTitle = useMemo(() => {
    return `共 ${total} 条数据`;
  }, [total]);
  let { financialOrg } = useModel('financialOrg');
  const access = useAccess();
  const columns: ProColumns<GithubIssueItem>[] = useMemo(
    () => [
      {
        title: '基金名称',
        dataIndex: 'name',
      },
      {
        title: '金融机构',
        dataIndex: 'fo_id',
        valueEnum: financialOrg,
      },
      {
        title: '认缴规模',
        dataIndex: 'highest_money',
        sorter: true,
        fieldProps:{
          suffix: '万元',
        },
        render: (_, record:any) => {
          return `${record.highest_money}万元`
        }
      },

      {
        title: '添加时间',
        dataIndex: 'add_time',
        hideInSearch: true,
        sorter: true,
        valueType: 'dateTime',
        width:'200px'
      },
      {
        title: '注册时间区间',
        hideInTable: true,
        dataIndex: 'created_at',
        valueType: 'dateTimeRange',
        search: {
          transform: (value) => {
            let [start, end] = value;
            return {
              start,
              end,
            };
          },
        },
      },
      {
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: '160px',
        hideInSearch: true,
        hideInTable: !access.canEdit,
        render: (text, record, _, action) => [
          <TzButton
            type="link"
            key={'info'}
            onClick={() => {
              navigate(`/product/fund/info?id=${record.id}`);
            }}
          >
            编辑
          </TzButton>,
          <TzPopconfirm
            description="确认删除此基金?"
            key={'del'}
            onConfirm={() => {
              loanDelete({ product_type: 5,id: record.id }).then((res) => {
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
    [financialOrg],
  );
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sorter, filter) => {
        const res = await loanList({ product_type: 5,highest_money_unit:1, ...params });
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
            const { ...rest } = values;
            return {
              subscription_unit: '1',
              ...rest,
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
              navigate(`/product/fund/info`);
              // actionRef.current?.reload();
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
