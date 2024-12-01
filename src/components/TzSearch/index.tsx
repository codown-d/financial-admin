"use client";
import React, { useMemo } from "react";
import { Input } from 'antd';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

interface TzSearchProps extends SearchProps{}
const { Search } = Input;
export default function TzSearch(props: TzSearchProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-search ${props.className}`,
    };
  }, [props]);
  return <Search {...realProps}/>;
}