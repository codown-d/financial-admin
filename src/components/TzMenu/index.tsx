import { Menu, MenuProps } from "antd";
import { useMemo } from "react";

interface TzMenuProps extends MenuProps {}
export default function TzMenu(props: TzMenuProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-menu ${props.className || ""}`,
    };
  }, [props]);
  return <Menu {...realProps} />;
}
