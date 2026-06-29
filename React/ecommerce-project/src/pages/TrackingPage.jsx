import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Header } from '../components/Header';
import TrackingFavicon from '../assets/images/tracking-favicon.png';
import './TrackingPage.css';

export function TrackingPage({ cart }) {
    const [ order, setOrder ] = useState(null);
    const { orderId, productId } = useParams();

    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }

        fetchTrackingData();
    }, [orderId]);

    if(!order) {
        return null;
    }

    const orderProduct = order.products
        .find((orderProduct) => {
            return orderProduct.productId === productId;
        });

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    const deliveryPercent = totalDeliveryTimeMs <= 0 ? 100 : Math.min(100, (timePassedMs / totalDeliveryTimeMs) * 100);

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;

    return (
        <>
            <title>Tracking</title>
            <link rel="icon" type="image/svg+xml" href={TrackingFavicon} />

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    {orderProduct && (
                        <>
                            <div className="delivery-date">
                                {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>

                            <div className="product-info">
                                {orderProduct.product.name}
                            </div>

                            <div className="product-info">
                                Quantity: {orderProduct.quantity}
                            </div>

                            <img className="product-image" src={orderProduct.product.image} />
                        </>
                    )}

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}