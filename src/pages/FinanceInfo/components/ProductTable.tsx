import { TzButton } from '@/components/TzButton';
import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button } from 'antd';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '申请人',
    dataIndex: 'name',
  },
  
  {
    title: '类型',
    dataIndex: 'containers',
  },
  {
    title: '金额（万元）',
    dataIndex: 'containers',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '用途',
    dataIndex: 'status',
  },
  {
    title: '期限',
    dataIndex: 'creator',
  },
  {
    title: '担保方式',
    dataIndex: 'creator',
  },
  
  {
    title: '地区',
    dataIndex: 'creator',
  },
  {
    title: '联系方式',
    dataIndex: 'creator',
  },
  
  {
    title: '还款方式',
    dataIndex: 'creator',
  },
  {
    title: '受益人',
    dataIndex: 'creator',
  },
  
  {
    title: '申请时间',
    dataIndex: 'creator',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '状态',
    dataIndex: 'creator',
  },
  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    render: () => [
      <TzButton type="link">受理</TzButton>,
      <TzButton type="link">不受理</TzButton>,
      <TzButton type="link">查看详情</TzButton>,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      dataSource={tableListDataSource}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      columns={columns}
      search={false}
      dateFormatter="string"
      options={false}
    />
  );
};