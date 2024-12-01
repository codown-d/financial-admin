"use client";
import { Form, FormItemProps, FormProps } from "antd";
import { useMemo } from "react";

interface TzFormProps extends FormProps {
  children?: React.ReactNode;
}
export default function TzForm(props: TzFormProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-form ${props.className || ""}`,
    };
  }, [props]);
  return <Form {...realProps} />;
}
interface TzFormItemProps extends FormItemProps {
  children?: React.ReactNode;
}

TzForm.Item = (props: TzFormItemProps) => {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-form-item ${props.className || ""}`,
    };
  }, [props]);
  return <Form.Item {...realProps} />;
};
export const TzFormItem = TzForm.Item;
