"use client";
import { Divider, DividerProps } from "antd";
import React, { useMemo } from "react";
export interface TzDividerProps extends DividerProps {}
export default function TzDivider(props: TzDividerProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-divider !my-3 ${props.className}`,
    };
  }, [props]);
  return <Divider {...realProps}/>;
}
