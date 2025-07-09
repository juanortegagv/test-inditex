import Link from 'next/link';
import { Button } from '@/components/ui/button';
import styles from '../app/cart/cart.module.css';
import type { CartItem } from '@/lib/types';
import { forwardRef } from 'react';

interface CartSummaryProps {
  cartItems: CartItem[];
  totalPrice: number;
}

const CartSummary = forwardRef<HTMLDivElement, CartSummaryProps>(({ cartItems, totalPrice }, ref) => (
  <div ref={ref} className={styles.summary}>
    <div className={styles.summaryTop}>
      <span className={styles.mobileTotalLabel}>TOTAL</span>
      <span className={styles.mobileTotalPrice} data-testid="cart-mobile-total">
        {totalPrice.toLocaleString()} EUR
      </span>
    </div>
    <div className={styles.summaryBottom}>
      <Button asChild variant="outline" className={styles.continueShopping}>
        <Link href="/">Continue Shopping</Link>
      </Button>
      {cartItems.length > 0 && (
        <Button size="lg" className={styles.payButton}>
          Pay
        </Button>
      )}
    </div>
    {cartItems.length > 0 && (
      <div className={styles.checkoutContainer}>
        <Button asChild variant="outline" className={styles.continueShopping}>
          <Link href="/">Continue Shopping</Link>
        </Button>
        <div className={styles.desktopSummaryRight}>
          <span className={styles.desktopTotalLabel}>TOTAL</span>
          <span className={styles.desktopTotalPrice} data-testid="cart-desktop-total">{totalPrice.toLocaleString()} EUR</span>
          <Button size="lg" className={styles.payButton}>
            Pay
          </Button>
        </div>
      </div>
    )}
  </div>
));

CartSummary.displayName = 'CartSummary';

export default CartSummary; 