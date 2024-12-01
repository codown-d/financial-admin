"use client";
import { Card, CardProps, Image } from "antd";
import React, { useMemo } from "react";
export interface TzCardProps extends CardProps {}
export default function TzCard(props: TzCardProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-card ${props.className}`,
    };
  }, [props]);
  return <Card {...realProps}></Card>;
}
