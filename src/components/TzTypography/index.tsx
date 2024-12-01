"use client";
import { Typography, TypographyProps } from "antd";
import { ParagraphProps } from "antd/es/typography/Paragraph";
import { TitleProps } from "antd/es/typography/Title";
import { useMemo } from "react";
const { Title, Paragraph } = Typography;
interface TzTypographyProps extends TypographyProps {
  children?: React.ReactNode;
}
export default function TzTypography(props: TzTypographyProps) {
  let { children } = props;
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-typography`,
    };
  }, [props]);
  return <Typography {...realProps}>{children}</Typography>;
}
interface TzTitleProps extends TitleProps {}
TzTypography.TzTitle = (props: TzTitleProps) => {
  let { children } = props;
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-title ${props.className || ""}`,
    };
  }, [props]);
  return <Title {...realProps}>{children}</Title>;
};
export const TzTitle = TzTypography.TzTitle;
interface TzParagraphProps extends ParagraphProps {}
TzTypography.TzParagraph = (props: TzParagraphProps) => {
  let { children } = props;
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-paragraph ${props.className || ""}`,
    };
  }, [props]);
  return <Paragraph {...realProps}>{children}</Paragraph>;
};
export const TzParagraph = TzTypography.TzParagraph;
