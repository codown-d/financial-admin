import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import { useAreaData } from '@/hooks';
import { financialDelete, financialList, governmentDepartmentDelete, governmentList } from '@/services';
import { findParentIds } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Link, useNavigate } from '@umijs/max';
import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Access, useAccess } from '@umijs/max';

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
  const [total, setTotal] = useState(0);
  let headerTitle = useMemo(() => {
    return `共 ${total} 条数据`;
  }, [total]);
  let { areaData } = useAreaData();
  const navigate = useNavigate();
  const access = useAccess();
  const columns: ProColumns<GithubIssueItem>[] = useMemo(
    () => [
      {
        title: '机构名称',
        dataIndex: 'organs_name',
        ellipsis: true,
        onFilter: true,
      },
      {
        title: '地区',
        dataIndex: 'area_id',
        hideInTable: true,
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
        title: '地区',
        dataIndex: 'area_desc',
        onFilter: true,
        hideInSearch: true,
      },
      {
        title: '详细地址',
        dataIndex: 'address',
        hideInSearch: true,
      },
      {
        title: '添加时间',
        sorter: true,
        dataIndex: 'add_time',
        hideInSearch: true,
        valueType: 'dateTime',
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
          <Access accessible={access.canEdit}>
            <TzButton type="link" key={'edit'} >
              <Link
                to={`/customer/government-list/info?id=${record.id}`}
              >
                编辑
              </Link>
            </TzButton>
          </Access>,
          <TzPopconfirm
            key={'del'}
            description="确认删除此部门?"
            onConfirm={() => {
              governmentDepartmentDelete({ id: record.id }).then((res) => {
                action?.reload();
              });
            }}
          >
            <TzButton type="link" danger onClick={() => { }}>
              删除
            </TzButton>
          </TzPopconfirm>,
        ],
      },
    ],
    [areaData],
  );
  let syncToUrlFn = useCallback(
    (values: Record<string, any>, type: 'get' | 'set') => {
      if (type === 'get') {
        let idPath = findParentIds(areaData, values.area_id);
        return {
          ...values,
          area_id: [...idPath],
          created_at:[values.start, values.end]
        };
      }
      return values;
    },
    [areaData,access],
  );
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sorter, filter) => {
        const res = await governmentList({
          ...params,
        });
        setTotal(res.count)
        return {
          success: true,
          data: res.dataList,
          total: res.count
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
        syncToUrl: syncToUrlFn,
      }}
      pagination={{
        pageSize: 10,
      }}
      headerTitle={headerTitle}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate(`/customer/government-list/info`);
          }}
          type="primary"
        >
          添加
        </Button>,
      ]}
    />
  );
};
