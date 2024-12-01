"use client";
import React, { useMemo } from "react";
import Image , { ImageProps as NextImageProps }  from 'next/image';


interface TzNextImageProps extends  Omit<NextImageProps, 'alt'>{
  alt?: string
}
export default function TzNextImage(props: TzNextImageProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      alt: props.alt || "tz-image",
      className: `tz-image inline-block ${props.className}`,
    };
  }, [props]);
  return <Image  width={500} height={300} {...realProps}/>;
}
