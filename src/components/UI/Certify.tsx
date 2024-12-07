import { VERIFY_STATUS } from '@/constants';
import { useMemo } from 'react';

export type CertifyStatusProps = '1' | '2' | '3'
export default function (props: { title: string; status: CertifyStatusProps }) {
  let { title, status } = props;
  let data = useMemo(() => {
    return VERIFY_STATUS[status];
  }, [status]);
  return (
    <span className='flex w-fit rounded-[8px] overflow-hidden' style={data?.style}>
      <span className='py-1 px-3 font-bold'>{data?.text}</span>
      {title&&<span className='bg-white py-1 px-3 text-[#333333]' style={{
        borderLeft: `1px solid ${data?.style?.borderColor}`,
      }}>{title}</span>}
    </span>
  );
}
