import { Modal, ModalFuncProps, ModalProps } from "antd";
import { useMemo } from "react";

interface TzModalProps extends ModalProps {}
export default function TzModal(props: TzModalProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-modal ${props.className || ""}`,
    };
  }, [props]);
  return <Modal {...realProps} />;
}
const { confirm } = Modal;
export const TzConfirm = (props: ModalFuncProps) => {
  confirm(
    Object.assign(
      {
        width: 620,
        icon: null,
        footer: (_, { OkBtn, CancelBtn }) => (
          <div className="flex items-center justify-center mt-[20px] mb-2">
            <CancelBtn />
            <div className="ml-5">
              <OkBtn />
            </div>
          </div>
        ),
        okButtonProps: {
          shape: "round",
          style: { width: "126px", paddingTop: 7, paddingBottom: 7 ,height:36},
        },
        cancelButtonProps: {
          shape: "round",
          style: { width: "126px", paddingTop: 7, paddingBottom: 7,height:36 },
        },
      },
      props
    )
  );
};
