import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import { data_type, product_type, repayment_method } from '@/constants';
import { loanDelete, loanList } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormDigitRange, ProTable } from '@ant-design/pro-components';
import { useAccess, useModel, useNavigate ,Access} from '@umijs/max';
import { Button, DatePicker } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { URLPATH } from '../constants';

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

export default (props: { product_type: product_type }) => {
  let { product_type } = props;
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
        title: '最高额度',
        dataIndex: 'highest_money',
        formItemProps: {
          label: '额度范围',
        },
        renderFormItem: () => (
          <ProFormDigitRange
            className="w-full"
            placeholder={['请输入最低额度', '请输入最高额度']}
          />
        ),
        search: {
          transform: (value) => {
            console.log(value);
            let [highest_money_start, highest_money_end] = value;
            return {
              highest_money_start,
              highest_money_end,
            };
          },
        },
      },
      {
        title: '最低利率',
        dataIndex: 'premium_desc',
        formItemProps: {
          label: '利率范围',
        },
        renderFormItem: () => (
          <ProFormDigitRange
            placeholder={['请输入最低利率', '请输入最高利率']}
          />
        ),
        search: {
          transform: (value) => {
            console.log(value);
            let [rate_start, rate_end] = value;
            return {
              rate_start,
              rate_end,
            };
          },
        },
      },
      {
        title: '期限',
        dataIndex: 'term',
        hideInSearch: true,
      },
      {
        title: '担保方式',
        dataIndex: 'data_type',
        valueEnum: data_type,
      },
      {
        title: '还款方式',
        dataIndex: 'repayment_method',
        valueEnum: repayment_method,
      },
      {
        title: '添加时间',
        dataIndex: 'add_time',
        sorter: true,
        formItemProps: {
          label: '添加时间区间',
        },
        valueType: 'dateTime',
        renderFormItem: () => {
          return <RangePicker format="YYYY-MM-DD" />;
        },
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
        width: '300px',
        hideInTable: !access.canEdit,
        hideInSearch: true,
        render: (text, record, _, action) => [
          <TzButton
            type="link"
            key={'info'}
            onClick={() => {
              navigate(
                `/product/${URLPATH[product_type]}/info?id=${record.id}`,
              );
            }}
          >
            编辑
          </TzButton>,
          <TzPopconfirm
            description="确认删除此贷款产品?"
            key={'del'}
            onConfirm={() => {
              action?.reload();
              return;
              loanDelete({ id: record.id }).then((res) => {
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
          ...params,
          product_type,
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
              ...rest,
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
        <Access  accessible={access.canEdit}>
          
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate(`/product/${URLPATH[product_type]}/info`);
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
