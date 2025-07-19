import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './products.scss';
import { fetchProducts } from "../../redux/features/product/slice"
import { addToCart } from '../../redux/features/cart/slice';
import { useDispatch, useSelector } from 'react-redux';
 
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const category = query.get("query");
    const dispatch = useDispatch();
    const stateSelector = useSelector(state => state.products);

    // useEffect(() => {
    //     dispatch(fetchProducts())
    //     fetch('https://fakestoreapi.com/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(category ? data?.filter(d => d.category === category) : data))
    //         .catch(err => console.error('Error fetching products:', err));
    // }, [category]);

    useEffect(() => {
        dispatch(fetchProducts())
    }, []);

    const listData = useMemo(() => {
        return category ? stateSelector?.items?.filter(d => d.category === category) : stateSelector?.items
    }, [category, stateSelector?.items]);
    
  if (stateSelector?.status === 'loading') return <p>Loading...</p>;
  if (stateSelector?.status === 'failed') return <p>Error: Something went wrong</p>;


    return (
        <div className="product-list">
            <h2>Product List</h2>
            <div className="products">
                {listData?.map(product => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>

                        <div className="actions">
                            <button
                                className={`wishlist ${false} ? 'active' : ''}`}
                            >
                                <FaHeart />
                            </button>
                            <button
                                className="add-to-cart"
                                onClick={() => dispatch(addToCart(product))}
                            >
                                <FaShoppingCart />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;


