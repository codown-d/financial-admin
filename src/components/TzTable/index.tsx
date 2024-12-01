"use client";
import { Table, TablePaginationConfig, TableProps } from "antd";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import { merge } from "lodash";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
interface TzTableProps<T> extends TableProps<T> {}
export default function TzTable<T extends object>(props: TzTableProps<T>) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-table ${props.className}`,
    };
  }, [props]);
  return <Table<T> {...realProps} />;
}
export interface TzTableServerPageProps extends TableProps {
  defaultPagination?: TablePaginationConfig;
  initialData?:any[]
  reqFun: (
    pagination: TablePaginationConfig,
    filters?: Record<string, FilterValue | null>,
    sorter?: SorterResult<any> | SorterResult<any>[],
    extra?: TableCurrentDataSource<any>
  ) => Promise<{
    data: any[];
    total: number;
    current?: number;
    pageSize?: number;
  }>;
}
const defaultTablePagination:TablePaginationConfig = {
  current:1,
  defaultCurrent: 1,
  defaultPageSize: 10,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 50, 100],
};
export const TzTableServerPage = forwardRef((
  props: TzTableServerPageProps,
  ref?: React.Ref<any>
) =>{
  const { reqFun, defaultPagination,initialData, ...tableProps } = props;
  let dfp = merge({}, defaultTablePagination, defaultPagination);
  const [dataSource, setDataSource] = useState(initialData);
  const [pagination, setPagination] = useState(dfp);
  const [filters, setFilters] = useState([]);
  const [sorter, setSorter] = useState([]);
  const [loading, setLoading] = useState(true);
  const reqSubFun = useCallback(
    async (pagination: TablePaginationConfig, filters?: any, sorter?: any, extra?: any) => {
      setLoading(true);
      let res = await reqFun(pagination, filters, sorter, extra);
      setDataSource(res.data);
      setPagination(pre=>{
        return merge({}, pre, {total:res.total})
      })
      setLoading(false);
    },
    [reqFun]
  );
  const handleTableChange = (pagination: TablePaginationConfig, filters: React.SetStateAction<never[]>, sorter: React.SetStateAction<never[]>, extra: any) => {
    setPagination(pagination);
    setFilters(filters);
    setSorter(sorter);
    reqSubFun(pagination, filters, sorter, extra);
  };
  useEffect(() => {
    reqSubFun(pagination);
  }, [reqSubFun]);
  useImperativeHandle(
    ref,
    () => {
      let action = {
        refresh() {},
      };
      return action;
    },
    []
  );

  return (
    <TzTable
      loading={loading}
      dataSource={dataSource}
      pagination={pagination}
      {...tableProps}
      onChange={handleTableChange}
    />
  );
});
