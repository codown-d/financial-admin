"use client";
import React, { useMemo } from "react";
interface TzIconProps extends React.HTMLAttributes<HTMLElement> {
  className: string;
}
export default function TzIcon(props: TzIconProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-icon fa-solid ${props.className}`,
    };
  }, [props]);
  return <i {...realProps}></i>;
}
