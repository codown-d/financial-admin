import { product_type } from '@/constants';
import ProductInfo from './components/ProductInfo';

export default () => {
  return <ProductInfo product_type={product_type.Bank} />;
};
