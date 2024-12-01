import {  Radio, RadioProps } from "antd";
import { useMemo } from "react";

interface TzRadioProps extends RadioProps {}
export default function TzRadio(props: TzRadioProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-radio ${props.className || ""}`,
    };
  }, [props]);
  return <Radio {...realProps} />;
}
