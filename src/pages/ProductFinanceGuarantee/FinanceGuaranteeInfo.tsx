import { product_type } from '@/constants';
import ProductInfo from '../ProductBank/components/ProductInfo';

export default () => {
  return <ProductInfo product_type={product_type.FinanceGuarantee} />;
};
