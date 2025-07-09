import Image from 'next/image';
import styles from '../app/cart/cart.module.css';
import { memo } from 'react';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    selectedColor: string;
    selectedStorage: string;
    quantity: number;
  };
  removeFromCart: (id: string, color: string, storage: string) => void;
  priority?: boolean;
}

const CartItem = memo(({ item, removeFromCart, priority = false }: CartItemProps) => {
  return (
    <div 
      key={`${item.id}-${item.selectedColor}-${item.selectedStorage}`} 
      className={styles.cartItem}
    >
      <div className={styles.itemImageContainer}>
        <Image
          src={item.image || 'https://placehold.co/160x160.png'}
          alt={item.name}
          fill
          className={styles.itemImage}
          sizes="(min-width: 768px) 160px, 128px"
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>
      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{item.name}</h3>
        <p className={styles.itemSpecs}>
          {item.selectedStorage} | {item.selectedColor}
        </p>
        <p className={styles.itemQuantity}>
          Quantity: {item.quantity}
        </p>
        <p className={styles.itemPrice} data-testid="cart-item-price">
          {item.price.toLocaleString()} EUR
        </p>
        <button
          onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedStorage)}
          className={styles.removeButton}
        >
          Remove
        </button>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem; 