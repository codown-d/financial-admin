import { product_type } from '@/constants';
import ProductTableList from '../ProductBank/components/ProductTableList';
export default () => {
  return (<ProductTableList product_type={product_type.Microloan} />);
};
