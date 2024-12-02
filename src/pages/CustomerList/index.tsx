import { TzButton } from '@/components/TzButton';
import TzPopconfirm from '@/components/TzPopconfirm';
import Certify, { CertifyStatusProps } from '@/components/UI/Certify';
import { AREA_OP, VERIFY_TYPE } from '@/constants';
import { useAreaData } from '@/hooks';
import { financialDelete, userList } from '@/services';
import { findParentIds } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, DatePicker } from 'antd';
import { last } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';

const { RangePicker } = DatePicker;
type GithubIssueItem = {
  id: number;
  account: string;
  password: string;
  reg_time: string;
  region: string;
  real_name: string;
  enterprise_name: string;
  enterprise_verify_status:CertifyStatusProps
  realname_name:string;
  verify_status:CertifyStatusProps
};

export default () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  let headerTitle = useMemo(() => {
    return `共 ${total} 条数据`;
  }, [total]);
  let {areaData}=useAreaData()
  const columns: ProColumns<GithubIssueItem>[] = useMemo(()=>(
    [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '账号',
      dataIndex: 'user_name',
      ellipsis: true,
      onFilter: true,
    },
    {
      title: '认证方式',
      dataIndex: 'verify_type',
      hideInTable: true,
      valueType: 'select',
      valueEnum: VERIFY_TYPE,
    },
    {
      title: '公司名称',
      dataIndex: 'company_name',
      hideInTable: true,
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
      title: '注册时间区间',
      dataIndex: 'created_at',
      hideInTable: true,
      valueType: 'dateTimeRange',
      search: {
        transform: (value) => {
          return {
            start: value[0],
            end: value[1],
          };
        },
      },
    },
    {
      title: '密码',
      dataIndex: 'user_pass_view',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '注册时间',
      dataIndex: 'add_time',
      sorter: true,
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '地区',
      dataIndex: 'area_desc',
      onFilter: true,
      hideInSearch: true,
    },
    {
      title: '实名认证',
      dataIndex: 'realname_name',
      hideInSearch: true,
      render: (text, record, _, action) => {
        let { realname_name,verify_status } = record;
        return <Certify title={realname_name} key={realname_name} status={verify_status} />;
      },
    },

    {
      title: '企业认证',
      dataIndex: 'enterprise_name',
      hideInSearch: true,
      render: (text, record, _, action) => {
        let { enterprise_name,enterprise_verify_status } = record;
        return <Certify title={enterprise_name} key={enterprise_name} status={enterprise_verify_status} />;
      },
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      hideInSearch: true,
      render: (text, record, _, action) => ([
        <TzButton
          type="link"
          key={'info'}
          onClick={() => {
            navigate(`/customer/customer-list/customer-info?id=${record.id}`);
          }}
        >
          查看
        </TzButton>,
        // <TzPopconfirm description="确认删除此客户?" 
        // key={'del'} onConfirm={()=>{
        //   action?.reload()
        //   return;
        //   financialDelete({id:record.id}).then(res=>{
        //     action?.reload()
        //   })
        // }}>
        //   <TzButton type="link" danger onClick={() => {}}>
        //     删除
        //   </TzButton>
        // </TzPopconfirm>
      ]
        
      ),
    },
  ]),[areaData])
  let syncToUrlFn=useCallback((values: Record<string, any>, type: "get" | "set") => {
    if (type === 'get') {
      let idPath=findParentIds(areaData,values.area_id)
      return {
        ...values,
        created_at: [values.start, values.end],
        area_id:[...idPath]
      };
    }
    return values;
  },[areaData])
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sorter, filter) => {
        const res = await userList({
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
            navigate(`/customer/customer-list/customer-info`);
          }}
          type="primary"
        >
          添加
        </Button>,
      ]}
    />
  );
};
