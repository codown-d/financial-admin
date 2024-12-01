import { TzButton } from '@/components/TzButton';
import { action_status, action_status_filter, data_type, purpose, term } from '@/constants';
import { useAreaData } from '@/hooks';
import { allList } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormDigitRange, ProTable } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
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
        title: '金额范围',
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
        title: '期限范围',
        dataIndex: 'term',
        valueEnum: term,
      },
      {
        title: '担保方式',
        dataIndex: 'guarantee_method',
        valueEnum: data_type,
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
        title: '状态',
        dataIndex: 'action_status',
        valueEnum: action_status_filter,
      },
      {
        title: '发布时间',
        dataIndex: 'created_at',
        sorter: true,
        valueType: 'dateTimeRange',
        formItemProps: {
          label: '发布时间区间',
        },
        search: {
          transform: (value) => {
            let [start, end] = value;
            return { start, end };
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
        const res = await allList({
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
      // toolBarRender={() => [
      //   <Button
      //     key="button"
      //     icon={<PlusOutlined />}
      //     onClick={() => {
      //       actionRef.current?.reload();
      //     }}
      //     type="primary"
      //   >
      //     添加
      //   </Button>,
      // ]}
    />
  );
};
