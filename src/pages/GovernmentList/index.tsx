import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import { useAreaData } from '@/hooks';
import { departmentList, financialDelete, financialList } from '@/services';
import { findParentIds } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useMemo, useRef, useState } from 'react';

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
  const columns: ProColumns<GithubIssueItem>[] = useMemo(
    () => [
      {
        title: '机构名称',
        dataIndex: 'organs_name',
        ellipsis: true,
        onFilter: true,
      },
      {
        title: '账号',
        dataIndex: 'user_name',
        ellipsis: true,
        onFilter: true,
      },
      {
        title: '密码',
        dataIndex: 'password',
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '联系电话',
        dataIndex: 'contact_phone',
        ellipsis: true,
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
        dataIndex: 'add_time_desc',
        sorter: true,
        hideInSearch: true,
        renderFormItem: () => {
          return <RangePicker format="YYYY-MM-DD" />;
        },
      },
      {
        title: '操作',
        fixed: 'right',
        align: 'center',
        hideInSearch: true,
        render: (text, record, _, action) => [
          <TzButton type="link" key={'edit'}>
            <Link
              to={`/customer/financial-list/financial-info?id=${record.id}`}
            >
              编辑
            </Link>
          </TzButton>,
          <TzPopconfirm
            key={'del'}
            description="确认删除此金融机构?"
            onConfirm={() => {
              action?.reload();
              return;
              financialDelete({ id: record.id }).then((res) => {
                action?.reload();
              });
            }}
          >
            <TzButton type="link" danger onClick={() => {}}>
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
        };
      }
      return values;
    },
    [areaData],
  );
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sorter, filter) => {
        const res = await departmentList({
          ...params,
        });
        setTotal(res.count)
        return {
          success:true,
          data: res.dataList,
          total:res.count
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
        syncToUrl: syncToUrlFn,
      }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      headerTitle={headerTitle}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          添加
        </Button>,
      ]}
    />
  );
};
