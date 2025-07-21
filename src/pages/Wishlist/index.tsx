import { useEffect} from 'react';
import './wishlist.scss';
import { getWishList } from "../../redux/features/wishlist/slice"
import { useDispatch, useSelector } from 'react-redux';
import SEO from '../../components/common/SEO/ReactHelmet';
import Card from '../../components/common/Card';
import type { ProductCardType } from '../../types/product';
import useAuth from '../../hooks/useAuth';

const Wishlist = () => {
  const { authState } = useAuth();
  const dispatch = useDispatch();
  const { items=[], isPending=false, error=false } = useSelector(state => state.wishlist);

  useEffect(() => {
    dispatch(getWishList(authState.accessToken))
  }, []);

  return (
    <>
      <SEO title={"wishlist"} />
      <div className="product-list">
        <h2>WishList</h2>
        <div className="products">
          {items?.map((product: ProductCardType) => (
            <Card product={product} />
          ))}
        </div>
      </div>
    </>

  );
};

export default Wishlist;