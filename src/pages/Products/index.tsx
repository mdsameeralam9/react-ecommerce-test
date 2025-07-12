import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './products.scss';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const category = query.get("query");

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(category ? data?.filter(d => d.category === category) : data))
            .catch(err => console.error('Error fetching products:', err));
    }, [category]);

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <div className="products">
                {products.map(product => (
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


