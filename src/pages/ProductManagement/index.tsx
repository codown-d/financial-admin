import { TzButton } from '@/components/TzButton';
import {
  action_status_filter,
  GUARANTEE_METHOD,
  product_type_filter,
  purpose,
  repayment_method,
} from '@/constants';
import { useAreaData } from '@/hooks';
import { applyList } from '@/services';
import type { ActionType, ProColumns, ProTableProps } from '@ant-design/pro-components';
import { ProFormDigitRange, ProTable } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { DatePicker } from 'antd';
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
export type SearchAndOptionsProps = Pick<ProTableProps<any,Record<string, any>>, 'search' | 'options'|'headerTitle'>;
export default (props:{proTableProps?:SearchAndOptionsProps}) => {
  let {proTableProps}=props
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  let { areaData } = useAreaData();
  let headerTitle = useMemo(() => {
    return `共 ${total} 条数据`;
  }, [total]);
  const columns: ProColumns<GithubIssueItem>[] = useMemo(
    () => [
      {
        title: '申请人',
        dataIndex: 'apply_user',
      },
      {
        title: '类型',
        dataIndex: 'product_type',
        valueEnum: product_type_filter,
      },
      {
        title: '金额范围',
        sorter: true,
        dataIndex: 'account',
        renderFormItem: () => (
          <ProFormDigitRange placeholder={['最低金额', '最高金额']} />
        ),
        search: {
          transform: (value) => {
            let [apply_money_start, apply_money_end] = value;
            return { apply_money_start, apply_money_end };
          },
        },
      },

      {
        title: '用途',
        dataIndex: 'purpose',
        valueEnum: purpose,
      },
      {
        title: '担保方式',
        dataIndex: 'loan_guarantee_method',
        valueEnum: GUARANTEE_METHOD,
      },
      {
        title: '地区',
        dataIndex: 'area_id',
        valueType: 'cascader',
        fieldProps: {
          options: areaData,
        },
        search: {
          transform: (value) => {
            return {
              area_id: value.at(-1),
            };
          },
        },
      },
      {
        title: '联系方式',
        dataIndex: 'user_name',
      },
      {
        title: '状态',
        dataIndex: 'action_status',
        valueEnum: action_status_filter,
      },
      {
        title: '还款方式',
        dataIndex: 'repayment_method',
        valueEnum: repayment_method,
      },
      {
        title: '受益人',
        dataIndex: 'beneficiary',
      },
      {
        title: '申请时间',
        dataIndex: 'add_time',
        sorter: true,
        hideInSearch: true,
        valueType: 'dateTime',
      },
      {
        title: '申请时间区间',
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
        render: (text, record, _, action) => [
          <TzButton
            type="link"
            key={'accept'}
            onClick={() => {
              navigate(`/customer/customer-list/customer-info?id=${record.id}`);
            }}
          >
            受理
          </TzButton>,
          <TzButton
            type="link"
            key={'un-accept'}
            onClick={() => {
              navigate(`/customer/customer-list/customer-info?id=${record.id}`);
            }}
          >
            不受理
          </TzButton>,
          <TzButton
            type="link"
            key={'info'}
            onClick={() => {
              navigate(`/customer/customer-list/customer-info?id=${record.id}`);
            }}
          >
            查看详情
          </TzButton>,
        ],
      },
    ],
    [areaData],
  );
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sorter, filter) => {
        const res = await applyList({
          ...params,
        });
        setTotal(res.count);
        return {
          success: true,
          data: res.dataList,
          total: res.count,
        };
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
      {...proTableProps}
    />
  );
};
