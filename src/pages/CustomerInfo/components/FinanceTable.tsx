import FinanceManagement from '@/pages/FinanceManagement';
export default () => {
  return (
    <FinanceManagement
      proTableProps={{
        search: false,
        options: false,
        headerTitle:null
      }}
    />
  );
};
