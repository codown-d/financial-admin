"use client";
import { Select, Tag, TagProps } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import CheckableTag, { CheckableTagProps } from "antd/es/tag/CheckableTag";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

interface TzTagProps extends TagProps {}
export default function TzTag(props: TzTagProps) {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-tag ${props.className || ""}`,
    };
  }, [props]);
  return <Tag {...realProps} />;
}
interface TzCheckableTagProps extends CheckableTagProps {}

TzTag.CheckableTag = (props: TzCheckableTagProps) => {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-checkable-tag ${props.className || ""}`,
    };
  }, [props]);
  return <CheckableTag {...realProps} />;
};
export const TzCheckableTag = TzTag.CheckableTag;
interface TzCheckableTagNormalProps
  extends Omit<TzCheckableTagProps, "onChange" | "checked"> {
  items: DefaultOptionType[];
  onChange?: (values: any[]) => void;
  defaultChecked?: any[];
  value?: any[];
  checked?: boolean;
  multiple?: boolean;
}
export const TzCheckableTagNormal = (props: TzCheckableTagNormalProps) => {
  let {
    items,
    onChange,
    defaultChecked,
    value,
    multiple = false,
    ...otherProps
  } = props;

  let [selectedTags, setSelectedTags] = useState(
    defaultChecked === undefined && value === undefined
      ? multiple
        ? []
        : undefined
      : defaultChecked || value
  );
  let handleChange = (tag: any, checked: boolean) => {
    setSelectedTags((pre) => {
      if (checked) {
        return multiple ? [...pre, tag] : tag;
      } else {
        return multiple ? pre?.filter((item) => item !== tag) : undefined;
      }
    });
  };
  useLayoutEffect(() => {
    onChange?.(selectedTags);
  }, [selectedTags]);
  let getChecked = useCallback(
    (value) => {
      return multiple ? selectedTags?.includes(value) : selectedTags === value;
    },
    [multiple, selectedTags]
  );
  return (
    <>
      {items.map((item) => {
        return (
          <TzCheckableTag
            key={item.value}
            checked={getChecked(item.value)}
            {...otherProps}
            onChange={(checked) => handleChange(item.value, checked)}
          >
            {item.label}
          </TzCheckableTag>
        );
      })}
    </>
  );
};
