export default function (props: {
  src: string;
  className?: string;
  alt?: string;
}) {
  let { src, className, alt, ...otherProps } = props;
  return <img src={`${PUBLIC_PATH}${src}`} className={className} alt={alt} {...otherProps} />;
}
