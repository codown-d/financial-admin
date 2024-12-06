import { TzButton } from '@/components/TzButton';
import { GUARANTEE_FROM, GUARANTEE_METHOD } from '@/constants';
import { guaranteeList, loanList } from '@/services';
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
        sorter: true,
        renderFormItem: () => (
          <ProFormDigitRange
            className="w-full"
            placeholder={['最低利率', '最高利率']}
          />
        ),

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
      },
      {
        title: '担保期限',
        dataIndex: 'registerTime',
      },
      {
        title: '保函形式',
        dataIndex: 'guarantee_form',
        valueEnum: GUARANTEE_FROM,
      },
      {
        title: '担保方式',
        dataIndex: 'guarantee_type',
        valueEnum: GUARANTEE_METHOD,
      },
      {
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: '300px',
        hideInSearch: true,
        hideInTable: !access.canEdit,
        render: (text, record, _, action) => [
          // <TzButton
          //   type="link"
          //   key={'accept'}
          //   onClick={() => {
          //     navigate(`/customer/customer-list/customer-info?id=${record.id}`);
          //   }}
          // >
          //   受理
          // </TzButton>,
          // <TzButton
          //   type="link"
          //   key={'unAccept'}
          //   onClick={() => {
          //     navigate(`/customer/customer-list/customer-info?id=${record.id}`);
          //   }}
          // >
          //   不受理
          // </TzButton>,
          <TzButton
            type="link"
            key={'info'}
            onClick={() => {
              navigate(`/product/guarantee/info?id=${record.id}`);
            }}
          >
            编辑
          </TzButton>,
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
