"use client";

import { useCart } from '@/context/cart-context';
import { useCartViewportItems } from '@/hooks/use-cart-viewport-items';
import styles from './cart.module.css';
import CartItem from '@/components/cart-item';
import CartSummary from '@/components/cart-summary';

const CartPage = () => {
  const { cartItems, removeFromCart, totalPrice, cartCount } = useCart();
  const { visibleItems, refs } = useCartViewportItems();

  return (
    <div className={styles.container}>
      <h1 ref={refs.cartTitleRef} className={styles.heading}>
        <span className={styles.cartTitle}>Cart</span> <span className={styles.cartCount}>({cartCount})</span>
      </h1>
      
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart} />
      ) : (
        <ul ref={refs.itemsRef} className={styles.cartItems} role="list">
          {cartItems.map((item, index) => (
            <li key={`${item.id}-${item.selectedColor}-${item.selectedStorage}`} role="listitem">
              <CartItem 
                item={item} 
                removeFromCart={removeFromCart}
                priority={index < visibleItems}
              />
            </li>
          ))}
        </ul>
      )}

      <CartSummary ref={refs.summaryRef} cartItems={cartItems} totalPrice={totalPrice} />
    </div>
  );
};

export default CartPage;
