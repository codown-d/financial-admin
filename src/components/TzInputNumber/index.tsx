"use client";
import {  InputNumber, InputNumberProps } from "antd";
import { useMemo } from "react";

interface TzInputNumberProps extends InputNumberProps {}
export default function TzInputNumber(props: TzInputNumberProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      
      className: `tz-input-number !w-full ${props.className || ""}`,
    };
  }, [props]);
  return <InputNumber {...realProps} />;
}
