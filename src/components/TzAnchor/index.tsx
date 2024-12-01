import { Anchor, AnchorProps, } from "antd";
import React, { useMemo } from "react";
interface TzAnchorProps extends AnchorProps {}
export default function TzAnchor(props: TzAnchorProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-card ${props.className}`,
    };
  }, [props]);
  return <Anchor {...realProps}/>;
}
