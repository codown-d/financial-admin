import ProductManagement from '@/pages/ProductManagement';
export default (props:{uid:string;}) => {
  return (
    <ProductManagement
    {...props}
      proTableProps={{
        search: false,
        options: false,
        headerTitle:null
      }}
    />
  );
};
