"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import styles from './cart.module.css';

const CartPage = () => {
  const { cartItems, removeFromCart, totalPrice, cartCount } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        <span className={styles.cartTitle}>Cart</span> <span className={styles.cartCount}>({cartCount})</span>
      </h1>
      
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart} />
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map(item => (
            <div key={`${item.id}-${item.selectedColor}-${item.selectedStorage}`} className={styles.cartItem}>
              <div className={styles.itemImageContainer}>
                <Image
                  src={item.image || 'https://placehold.co/160x160.png'}
                  alt={item.name}
                  fill
                  className={styles.itemImage}
                  sizes="(min-width: 768px) 160px, 128px"
                />
              </div>
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemSpecs}>
                  {item.selectedStorage} | {item.selectedColor}
                </p>
                <p className={styles.itemPrice}>
                  {isClient ? item.price.toLocaleString() : item.price} EUR
                </p>
                <button
                   onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedStorage)}
                   className={styles.removeButton}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.summary}>
         <Button asChild variant="outline" className={styles.continueShopping}>
            <Link href="/">Continue Shopping</Link>
         </Button>
         {cartItems.length > 0 && (
           <div className={styles.checkoutContainer}>
              <p className={styles.totalPrice}>
                  Total {isClient ? totalPrice.toLocaleString() : totalPrice} EUR
              </p>
              <Button size="lg" className={styles.payButton}>
                  Pay
              </Button>
           </div>
         )}
      </div>
    </div>
  );
};

export default CartPage;
