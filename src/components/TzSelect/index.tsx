"use client";
import React, { useMemo } from "react";
import {  Select } from 'antd';
import type {  SelectProps } from 'antd';


interface TzSelectProps extends SelectProps{}
export default function TzSelect(props: TzSelectProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-select ${props.className}`,
    };
  }, [props]);
  return <Select {...realProps}/>;
}
