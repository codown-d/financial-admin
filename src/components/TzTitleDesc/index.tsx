export default function (props: { title: any; className?: string }) {
  let { title, className } = props;
  return (
    <div
      className={`pl-2 relative before:content-[''] before:absolute before:rounded-sm before:left-0 before:w-1 before:h-[70%]  before:top-[16%] before:bg-[#3D5AF5] font-medium text-sm text-[#333333] leading-[21px] text-left ${
        className || ''
      }`}
    >
      {title}
    </div>
  );
}
