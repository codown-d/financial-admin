import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import { insurance_type } from '@/constants';
import { loanDelete, loanList } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Access, useAccess, useModel, useNavigate } from '@umijs/max';
import { Button, DatePicker } from 'antd';
import { useMemo, useRef, useState } from 'react';

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
        title: '保险名称',
        dataIndex: 'name',
      },
      {
        title: '金融机构',
        dataIndex: 'fo_id',
        valueEnum: financialOrg,
      },
      {
        title: '种类',
        dataIndex: 'data_type',
        valueEnum: insurance_type,
      },
      {
        title: '保额（万元）',
        dataIndex: 'highest_money',
        formItemProps: {
          label: '保费范围',
          name: 'premiumRange',
        },
        fieldProps: {
          suffix: '万元',
        },
        valueType: 'digitRange',
        search: {
          transform: (value) => {
            console.log(value);
            let [minimum_money, highest_money] = value;
            return {
              minimum_money,
              highest_money,
            };
          },
        }, 
        render: (_, record:any) => {
          return `${record.highest_money}万元`
        }
     
      },
      {
        title: '期限',
        dataIndex: 'term',
        hideInTable: true,
      },
      {
        title: '期限',
        dataIndex: 'term_desc',
        hideInSearch: true,  
      },
      {
        title: '添加时间',
        sorter: true,
        dataIndex: 'add_time',
        hideInSearch: true,
        valueType: 'dateTime',
        width: '200px',
      },
      {
        title: '添加时间区间',
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
        hideInSearch: true,
        hideInTable: !access.canEdit,
        render: (text, record, _, action) => [
          <TzButton
            type="link"
            key={'info'}
            onClick={() => {
              navigate(`/product/insurance/info?id=${record.id}`);
            }}
          >
            编辑
          </TzButton>,
          <TzPopconfirm
            description="确认删除此保险?"
            key={'del'}
            onConfirm={() => {
              loanDelete({ id: record.id, product_type: 6 }).then((res) => {
                action?.reload();
              });
            }}
          >
            <TzButton type="link" danger>
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
        const res = await loanList({
          product_type: 6,
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
            const { ...rest } = values;
            return {
              subscription_unit: '1',
              ...rest,
              created_at: [values.start, values.end],
              premiumRange: [values.minimum_money, values.highest_money],
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
              navigate(`/product/insurance/info`);
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
