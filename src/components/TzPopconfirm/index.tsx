"use client";
import React, { useMemo } from "react";
import { Input, Popconfirm } from 'antd';
import type { GetProps, PopconfirmProps } from 'antd';


interface TzPopconfirmProps extends  Omit<PopconfirmProps, 'title'>{
  title?: string;
}
export default function TzPopconfirm(props: TzPopconfirmProps) {
  const realProps = useMemo(() => {
    return {
      okText: '删除',
      cancelText: '取消',
      ...props,
      title : props.title||undefined,
      okButtonProps:{danger:true},
      className: `tz-popconfirm ${props.className}`,
    };
  }, [props]);
  return <Popconfirm {...realProps}/>;
}