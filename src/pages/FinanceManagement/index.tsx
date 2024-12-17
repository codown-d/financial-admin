import { TzButton } from '@/components/TzButton';
import { action_status_filter, data_type, purpose, term } from '@/constants';
import { useAreaData } from '@/hooks';
import { allList, allocation, financeAction, financialOrgs } from '@/services';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProFormSelect, ProTable } from '@ant-design/pro-components';
import { useAccess, useNavigate } from '@umijs/max';
import { DatePicker, message } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { SearchAndOptionsProps } from '../ProductManagement';

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
        render: (_, record: any) => {
          return `${record.user.user_name}`;
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
              area_id: value?.at(-1),
            };
          },
        },

        render: (_, record: any) => {
          return `${record.user.area_desc}`;
        },
      },
      {
        title: '发布时间',
        dataIndex: 'add_time',
        valueType: 'dateTime',
        hideInSearch: true,
        sorter: true,
        width: '200px',
      },
      {
        title: '发布时间区间',
        dataIndex: 'created_at',
        valueType: 'dateTimeRange',
        hideInTable: true,
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
      },

      {
        title: '操作',
        fixed: 'right',
        align: 'center',
        hideInSearch: true,
        render: (text, record: any, _, action) => {
          return (
            <>
              {access.canEdit ? (
                record.fo_id > 0 ? null : (
                  <ModalForm
                    title="分配机构"
                    width={500}
                    trigger={
                      <TzButton type="link" key={'fp'}>
                        分配
                      </TzButton>
                    }
                    labelAlign={'left'}
                    submitter={{
                      searchConfig: {
                        submitText: '确认',
                        resetText: '取消',
                      },
                    }}
                    onFinish={async (values) => {
                      let res = await allocation({ ...values, id: record.id });
                      if (res.code != 200) return false;
                      message.success('提交成功');
                      actionRef.current?.reload();
                      return true;
                    }}
                  >
                    <ProFormSelect
                      name="fo_id"
                      label="机构名称"
                      request={async () => {
                        let res = await financialOrgs();
                        return res.dataList.map(
                          (item: { organs_name: any; id: any }) => {
                            return { label: item.organs_name, value: item.id };
                          },
                        );
                      }}
                    />
                  </ModalForm>
                )
              ) : 1 == record.action_status ? (
                <>
                  <TzButton
                    type="link"
                    key={'accept'}
                    onClick={() => {
                      financeAction({ id: record.id, status:3 }).then(
                        (res) => {
                          if (res.code == 200) {
                            message.success('操作成功');
                            actionRef.current?.reload();
                          }
                        },
                      );
                    }}
                  >
                    受理
                  </TzButton>
                  <TzButton
                    type="link"
                    key={'un-accept'}
                    onClick={() => {
                      financeAction({ id: record.id, status: 2 }).then(
                        (res) => {
                          if (res.code == 200) {
                            message.success('操作成功');
                            actionRef.current?.reload();
                          }
                        },
                      );
                    }}
                  >
                    不受理
                  </TzButton>
                </>
              ) : 3 == record.action_status ? (
                <>
                  <TzButton
                    type="link"
                    key={'3'}
                    onClick={() => {
                      financeAction({ id: record.id, status: 5 }).then(
                        (res) => {
                          if (res.code == 200) {
                            message.success('操作成功');
                            actionRef.current?.reload();
                          }
                        },
                      );
                    }}
                  >
                    完成
                  </TzButton>
                  <TzButton
                    type="link"
                    key={'4'}
                    danger
                    onClick={() => {
                      financeAction({ id: record.id, status: 4 }).then(
                        (res) => {
                          if (res.code == 200) {
                            message.success('操作成功');
                            actionRef.current?.reload();
                          }
                        },
                      );
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
        const res = await allList({
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
              created_at: [values.start, values.end],
              moneyRange: [values.apply_money_start, values.apply_money_end],
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
