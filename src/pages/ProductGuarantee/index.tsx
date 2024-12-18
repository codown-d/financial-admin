import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import { data_type, GUARANTEE_FROM } from '@/constants';
import { guaranteeList, loanDelete, loanList } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormDigitRange, ProTable } from '@ant-design/pro-components';
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
        title: '产品名称',
        dataIndex: 'name',
      },
      {
        title: '金融机构',
        dataIndex: 'fo_id',
        valueEnum: financialOrg,
      },
      {
        title: '费率',
        dataIndex: 'rate',
        formItemProps: {
          label: '利率范围',
          name: 'rateRange',
        },
        fieldProps:{
          suffix: '%',
        },
        sorter: true,
        valueType:'digitRange',
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
          return `${record.rate}%`
        }
      },
      {
        title: '担保期限',
        dataIndex: 'term',
        fieldProps:{
          suffix: '月',
        },
        render: (_, record) => `${_}个月`
      },
      {
        title: '保函形式',
        dataIndex: 'guarantee_form',
        valueEnum: GUARANTEE_FROM,
      },
      {
        title: '担保方式',
        dataIndex: 'data_type',
        valueEnum: data_type,
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
              navigate(`/product/guarantee/info?id=${record.id}`);
            }}
          >
            编辑
          </TzButton>,
            <TzPopconfirm
            description="确认删除此保函产品?"
            key={'del'}
            onConfirm={() => {
              loanDelete({ id: record.id,product_type:7 }).then((res) => {
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
          product_type:7,
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
            const { minimum_money, highest_money, ...rest } = values;
            return {
              ...rest,
              rate:
                minimum_money !== undefined && highest_money !== undefined
                  ? [minimum_money, highest_money]
                  : undefined,
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
              navigate(`/product/guarantee/info`);
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
