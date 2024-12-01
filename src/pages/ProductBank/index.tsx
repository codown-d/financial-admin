import { product_type } from '@/constants';
import ProductTableList from './components/ProductTableList';
export default () => {
  return <ProductTableList product_type={product_type.Bank} />;
};
