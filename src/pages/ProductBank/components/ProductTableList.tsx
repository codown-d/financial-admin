import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import TzSelect from '@/components/TzSelect';
import { data_type, product_type, repayment_method } from '@/constants';
import { loanDelete, loanList } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Access, useAccess, useModel, useNavigate } from '@umijs/max';
import { Button, DatePicker, Form, InputNumber } from 'antd';
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
        title: '额度',
        dataIndex: 'highest_money',
        formItemProps: {
          label: '额度范围',
          name: 'moneyRange',
        },
        fieldProps: {
          suffix: '万元',
        },
        valueType: 'digitRange',
        search: {
          transform: (value) => {
            let [highest_money_start, highest_money_end] = value;
            return {
              highest_money_start,
              highest_money_end,
            };
          },
        },
        render: (_, record: any) => {
          return `${record.highest_money}万元`;
        },
      },
      {
        title: '利率',
        dataIndex: 'rate',
        formItemProps: {
          label: '利率范围',
          name: 'rateRange',
        },
        fieldProps: {
          suffix: '%',
        },
        valueType: 'digitRange',
        search: {
          transform: (value) => {
            let [rate_start, rate_end] = value;
            return {
              rate_start,
              rate_end,
            };
          },
        },
        render: (_, record: any) => {
          return `${record.rate}%`;
        },
      },
      {
        title: '期限',
        dataIndex: 'term',
        hideInTable: true,
        renderFormItem: (_, { type, defaultRender, ...rest }) => {
          if (type === 'table') {
            return (
              <div className='flex'>
                <Form.Item name="term" className='w-[70%]'>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="请输入期限值"
                  />
                </Form.Item>
                <Form.Item name="term_unit" className='w-[30%]'>
                  <TzSelect
                    options={[
                      { label: '天', value: "1" },
                      { label: '月', value: "2" },
                    ]}
                  />
                </Form.Item>
              </div>
            );
          }
          return defaultRender(_); // 默认渲染
        },
      },
      {
        title: '期限',
        dataIndex: 'term_desc',
        hideInSearch: true,
      },
      {
        title: '担保方式',
        dataIndex: 'data_type',
        valueEnum: data_type,
        fieldProps: {
          mode: 'multiple',  // 设置多选
        },
      },
      {
        title: '还款方式',
        dataIndex: 'repayment_method',
        valueEnum: repayment_method,  fieldProps: {
          mode: 'multiple',  // 设置多选
        },
      },
      {
        title: '添加时间',
        sorter: true,
        dataIndex: 'add_time',
        hideInSearch: true,
        valueType: 'dateTime',
        width: '150px',
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
              loanDelete({ id: record.id, product_type }).then((res) => {
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
        wrapperCol: { flex: 1 },
        colon: false,
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            const { ...rest } = values;
            return {
              ...rest,
              created_at: [values.start, values.end],
              moneyRange: [
                values.highest_money_start,
                values.highest_money_end,
              ],
              rateRange: [values.rate_start, values.rate_end],
              term_unit:values.term_unit||'1'
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
