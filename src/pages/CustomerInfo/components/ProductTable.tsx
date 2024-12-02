import ProductManagement from '@/pages/ProductManagement';
export default () => {
  return (
    <ProductManagement
      proTableProps={{
        search: false,
        options: false,
        headerTitle:null
      }}
    />
  );
};
