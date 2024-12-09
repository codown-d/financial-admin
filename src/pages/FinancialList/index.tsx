import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import { useAreaData } from '@/hooks';
import { financialDelete, financialList } from '@/services';
import { findParentIds } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Link, useNavigate } from '@umijs/max';
import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Access, useAccess } from '@umijs/max';
import TzImage from '@/components/TzImage';

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
        render:(_,record:any)=>{
          return <span className='flex items-center'><TzImage  src={record.logo} width={80} height={80}/>&nbsp;&nbsp; {record.organs_name}</span>
        }
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
            <TzButton type="link" key={'edit'}>
              <Link to={`/customer/financial-list/info?id=${record.id}`}>
                编辑
              </Link>
            </TzButton>
          </Access>,
          <TzPopconfirm
            key={'del'}
            description="确认删除此金融机构?"
            onConfirm={() => {
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
          created_at: [values.start, values.end]
        };
      }
      return values;
    },
    [areaData, access],
  );
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params, sorter, filter) => {
        const res = await financialList({
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
        onChange: (page) => console.log(page),
      }}
      headerTitle={headerTitle}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate(`/customer/financial-list/info`);
          }}
          type="primary"
        >
          添加
        </Button>,
      ]}
    />
  );
};
