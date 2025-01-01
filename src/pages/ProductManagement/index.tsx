import { TzButton } from '@/components/TzButton';
import TzSelect from '@/components/TzSelect';
import {
  action_status_filter,
  data_type,
  product_type_filter,
  purpose,
  repayment_method,
} from '@/constants';
import { useAreaData } from '@/hooks';
import { allocation, applyAction, applyList, financialOrgs } from '@/services';
import type {
  ActionType,
  ProColumns,
  ProTableProps,
} from '@ant-design/pro-components';
import { ModalForm, ProFormSelect, ProTable } from '@ant-design/pro-components';
import { useAccess, useNavigate } from '@umijs/max';
import { DatePicker, Form, InputNumber, message } from 'antd';
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
export type SearchAndOptionsProps = Pick<
  ProTableProps<any, Record<string, any>>,
  'search' | 'options' | 'headerTitle'
>;
export default (props: { proTableProps?: SearchAndOptionsProps; uid: any }) => {
  let { proTableProps, uid } = props;
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  let { areaData } = useAreaData();
  let headerTitle = useMemo(() => {
    return `共 ${total} 条数据`;
  }, [total]);

  const access = useAccess();
  const columns: ProColumns<GithubIssueItem>[] = useMemo(
    () => [
      {
        title: '申请人',
        dataIndex: 'apply_user',
        render: (text, record: any, _, action) => {
          return record.name;
        },
      },
      {
        title: "机构名称",
        dataIndex: ['financial_organs','organs_name'],
      },
      {
        title: "产品名称",
        dataIndex: ['product','name'],
      },
      {
        title: '类型',
        dataIndex: 'product_type',
        valueEnum: product_type_filter,fieldProps: {
          mode: 'multiple',  // 设置多选
        },
      },
      {
        title: '金额',
        dataIndex: 'apply_money',
        formItemProps: {
          label: '金额范围',
          name: 'moneyRange',
        },
        fieldProps: {
          suffix: '万元',
        },
        valueType: 'digitRange',
        search: {
          transform: (value) => {
            let [apply_money_start, apply_money_end] = value;
            return { apply_money_start, apply_money_end };
          },
        },
        render: (_, record: any) => {
          return `${record.apply_money}万元`;
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
        title: '用途',
        dataIndex: 'purpose',
        valueEnum: { ...purpose },
        renderText: (value) => {
          return purpose[value]?purpose[value].text : '-';
        },
        fieldProps: {
          mode: 'multiple',  // 设置多选
        },
      },
      {
        title: '担保方式',
        dataIndex: 'guarantee_method',
        valueEnum: { ...data_type}, 
        renderText: (value) => {
          return data_type[value]?data_type[value].text : '-';
        },
        fieldProps: {
          mode: 'multiple',  // 设置多选
        },
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
        render: (text, record: any, _, action) => {
          return record.user.area_desc;
        },
      },
      {
        title: '联系方式',
        dataIndex: ['user','user_name'],
        
      },
      {
        title: '还款方式',
        dataIndex: 'repayment_method',
        valueEnum: { ...repayment_method },
        renderText: (value) => {
          return repayment_method[value]?repayment_method[value].text : '-';
        },  fieldProps: {
          mode: 'multiple',  // 设置多选
        },
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
        title: '状态',
        dataIndex: 'action_status',
        valueEnum: action_status_filter,
        width:100
      },

      {
        title: '操作',
        fixed: 'right',
        align: 'center',
        hideInSearch: true,
        render: (text, record: any, _, action) => {
          return (
            <>
              { record.action_status == 1 ? (
                <>
                  <TzButton
                    type="link"
                    key={'accept'}
                    onClick={() => {
                      applyAction({ id: record.id, status: 3 }).then((res) => {
                        actionRef.current?.reload();
                        message.success('操作成功');
                      });
                    }}
                  >
                    受理
                  </TzButton>
                  <TzButton
                    type="link"
                    key={'un-accept'}
                    onClick={() => {
                      applyAction({ id: record.id, status: 2 }).then((res) => {
                        actionRef.current?.reload();
                        message.success('操作成功');
                      });
                    }}
                  >
                    不受理
                  </TzButton>
                </>
              ) : record.action_status == 3 ? (
                <>
                  <TzButton
                    type="link"
                    key={'2'}
                    onClick={() => {
                      applyAction({ id: record.id, status: 5}).then((res) => {
                        actionRef.current?.reload();
                        message.success('操作成功');
                      });
                    }}
                  >
                    完成
                  </TzButton>
                  <TzButton
                    type="link"
                    key={'3'}
                    danger
                    onClick={() => {
                      applyAction({ id: record.id, status: 4 }).then((res) => {
                        actionRef.current?.reload();
                        message.success('操作成功');
                      });
                    }}
                  >
                    谢绝
                  </TzButton>
                </>
              ) : null}
              <TzButton
                type="link"
                key={'info'}
                onClick={() => {
                  navigate(
                    `/customer/customer-list/customer-info?uid=${record.uid}`,
                  );
                }}
              >
                查看详情
              </TzButton>
            </>
          );
        },
      },
    ],
    [areaData],
  );
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params, sorter, filter) => {
        const res = await applyList({
          query_uid: uid,
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
              
              term_unit:values.term_unit||'1',
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
