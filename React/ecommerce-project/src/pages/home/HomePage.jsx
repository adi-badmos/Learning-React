import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import HomeFavicon from '../../assets/images/home-favicon.png';
import './HomePage.css';

export function HomePage({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get('/api/products')
            setProducts(response.data);
        }

        getHomeData();
    }, []);

    return (
        <>
            <title>Amazun</title>
            <link rel="icon" type="image/svg+xml" href={HomeFavicon} />

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}