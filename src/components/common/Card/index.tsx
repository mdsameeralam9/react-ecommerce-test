import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/slice';
import { addToWishList, removeFromWishList  } from '../../../redux/features/wishlist/slice';
import type { ProductCardType } from '../../../types/product';
import "./card.scss"
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    product: ProductCardType
}

const Card: React.FC<CardProps> = ({ product }) => {
    const { authState } = useAuth();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const wishlistState = useSelector((state: any) => state?.wishlist);
    const { items=[], isPending=false, error=false } = wishlistState || { };
    const isInWishlist = items?.some((item: ProductCardType) => item.productId === product.productId);
    
    const handleWishlist = () => {
        if(!authState.isLoggedIn){
            navigate("/");
            return;
        }
        if (isInWishlist) {
            dispatch(removeFromWishList({token:authState.accessToken, productId: product.productId}));
        } else {
            dispatch(addToWishList({token:authState.accessToken, product}));
        }
    };

    return (
        <div className="product-card" key={product.productId}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>

            <span className={`btnWishlist`} onClick={handleWishlist}>
                {!isInWishlist ? <FaRegHeart color='#0056b3'/> : <FaHeart  color='#0056b3'/> }
            </span>

            <div className="actions">
                <button
                    className="add-to-cart addBtn"
                    onClick={() => dispatch(addToCart(product))}
                >
                <div className="btnTextWrap">
                 <FaShoppingCart />
                 <span className="tooltip">ADD TO BAG</span>
                </div>
                </button>
            </div>
        </div>

    )
}

export default Card