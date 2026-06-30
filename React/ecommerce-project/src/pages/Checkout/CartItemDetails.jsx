import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
    const [ showQuantity, setShowQuantity ] = useState(false);
    const [ quantity, setQuantity ] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    const updateQuantity = async () => {
        if(showQuantity) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: quantity
            })

            await loadCart();
        }

        setShowQuantity(showQuantity => !showQuantity);
    }

    const handleQuantityKeyDown = async (event) => {
        if(event.key === 'Enter') {
            updateQuantity();
        } else if(event.key === 'Escape') {
            setShowQuantity(false);
            setQuantity(cartItem.quantity);
        }
    }

    const updateQuantityInput = (event) => {
        setQuantity(Number(event.target.value))
    }

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: 
                    </span>
                    {showQuantity ? (
                        <input
                            value={quantity}
                            onChange={updateQuantityInput}
                            onKeyDown={handleQuantityKeyDown}
                            className="update-quantity" type='text'
                        />
                    ) : (
                        <span className="quantity-label">{cartItem.quantity}</span>
                    )}
                    <span className="update-quantity-link link-primary" onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}
                    >
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}