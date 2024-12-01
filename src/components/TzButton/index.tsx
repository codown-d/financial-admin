import React, { useMemo } from "react";
import "./index.scss";
import { Button, ButtonProps } from "antd";

export interface TzButtonProps extends ButtonProps {}
export const TzButton = (props: TzButtonProps) => {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-button ${props.className} ${props.type==='link'?'!h-[auto]':''}`,

    };
  }, [props]);
  return <Button {...realProps} />;
};
