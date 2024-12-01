"use client";
import React, { useMemo } from "react";
import {  Image } from 'antd';
import type {  ImageProps } from 'antd';


interface TzImageProps extends ImageProps{}
export default function TzImage(props: TzImageProps) {
  let {src}=props
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-image ${props.className}`,
    };
  }, [props]);
  return <Image {...realProps}/>;
}
