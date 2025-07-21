import React, { use, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './products.scss';
import { fetchProducts } from "../../redux/features/product/slice"
import { getWishList } from "../../redux/features/wishlist/slice"
import { useDispatch, useSelector } from 'react-redux';
import SEO from '../../components/common/SEO/ReactHelmet';
import Card from '../../components/common/Card';
import type { ProductCardType } from '../../types/product';
import useAuth from '../../hooks/useAuth';

const ProductList = () => {
    const { authState } = useAuth();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const category = query.get("query");
    const dispatch = useDispatch();
    const stateSelector = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts())
    }, []);

    useEffect(() => {
        if(authState?.isLoggedIn){
          dispatch(getWishList(authState.accessToken))
        }
    }, [authState.isLoggedIn]);

    const listData = useMemo(() => {
        return category ? stateSelector?.items?.filter(d => d.category.toLowerCase().includes(category.toLowerCase())) : stateSelector?.items
    }, [category, stateSelector?.items]);

    if (stateSelector?.status === 'loading') return <p>Loading...</p>;
    if (stateSelector?.status === 'failed') return <p>Error: Something went wrong</p>;

    return (
        <>
            <SEO title={!category ? "Product List": category}/>
            <div className="product-list">
                <h2>Product List</h2>
                <div className="products">
                    {listData?.map((product:ProductCardType) => (
                        <Card product={product} />
                    ))}
                </div>
            </div>
        </>

    );
};

export default ProductList;


