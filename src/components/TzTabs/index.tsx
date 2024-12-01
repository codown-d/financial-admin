"use client";
import { Tabs, TabsProps } from "antd";
import React, { useMemo } from "react";
import { type } from "os";
export interface TzTabsProps extends TabsProps {}
export default function TzTabs(props: TzTabsProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: ` tz-tab ${props.className}`,
    };
  }, [props]);
  return  <Tabs {...realProps}/>;
}
