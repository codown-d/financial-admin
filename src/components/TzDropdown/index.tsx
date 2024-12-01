import { Dropdown, DropdownProps } from "antd";
import React, { useMemo } from "react";
interface TzDropdownProps extends DropdownProps {}
export default function TzDropdown(props: TzDropdownProps) {
  let { children,...otherProps } = props;
  const realProps = useMemo(() => {
    return {
      ...otherProps,
      className: `tz-dropdown ${props.className||''}`,
    };
  }, [props]);
  return <Dropdown {...realProps}>{children}</Dropdown>;
}
