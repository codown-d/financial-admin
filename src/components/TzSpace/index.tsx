import { Space, SpaceProps } from "antd";
import React, { useMemo } from "react";
interface TzSpaceProps extends SpaceProps{}
export default function TzSpace(props: TzSpaceProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-space ${props.className}`,
    };
  }, [props]);
  return <Space {...realProps}/>;
}
