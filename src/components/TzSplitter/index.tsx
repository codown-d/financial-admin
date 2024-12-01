"use client";
import React, { useMemo } from "react";
import { Splitter, SplitterProps } from 'antd';
import { PanelProps } from "antd/es/splitter/interface";
interface TzSplitterProps extends SplitterProps {
  children:React.ReactNode
}
export default function TzSplitter(props: TzSplitterProps) {
  let {children} = props
  const realProps = useMemo(() => {
    return {
      ...props,
      className: ` tz-splitter ${props.className}`,
    };
  }, [props]);
  return <Splitter {...realProps}>{children}</Splitter>;
}
interface TzPanelProps extends PanelProps {
  children:React.ReactNode
}
let {Panel} = Splitter
export const TzPanel = (props:TzPanelProps)=>{
  let {children} = props
  const realProps = useMemo(() => {
    return {
      ...props,
      className: ` tz-panel ${props.className}`,
    };
  }, [props]);
  return <Panel {...realProps}>{children}</Panel>;

}
TzSplitter.TzPanel=TzPanel
