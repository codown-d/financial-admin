import FinanceManagement from '@/pages/FinanceManagement';
export default (props: {uid:string;}) => {
  return (
    <FinanceManagement
      {...props}
      proTableProps={{
        search: false,
        options: false,
        headerTitle: null,
      }}
    />
  );
};
