import { ConfigProvider, Segmented, SegmentedProps } from "antd";
import React, { useMemo } from "react";
interface TzSegmentedProps extends SegmentedProps { }
export default function TzSegmented(props: TzSegmentedProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-segmented ${props.className}`,
    };
  }, [props]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedColor: "#fff",
          },
        },
      }}
    >
      <Segmented {...realProps} size={"large"}
        style={{ border: '1px solid #DDDDDD', background: '#fff' }} />
    </ConfigProvider>
  );
}
