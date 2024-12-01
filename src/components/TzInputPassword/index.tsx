"use client";
import {  Input } from "antd";
import { PasswordProps } from "antd/es/input";
import { useMemo } from "react";

let {Password }=Input

interface TzInputPasswordProps extends PasswordProps {}
export default function TzInputPassword(props: TzInputPasswordProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-password !w-full ${props.className || ""}`,
    };
  }, [props]);
  return <Password {...realProps} />;
}
