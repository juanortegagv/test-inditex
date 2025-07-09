import Link from 'next/link';
import Image from 'next/image';
import type { ProductListItem } from '@/lib/types';
import styles from './product-card.module.css';
import { memo } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface ProductCardProps {
  product: ProductListItem;
  priority?: boolean;
  showPrice?: boolean;
}

export const ProductCard = memo(({ product, priority = false, showPrice = true }: ProductCardProps) => {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLElement>();
  
  const shouldUsePriority = priority || hasIntersected;

  return (
    <article ref={ref} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.imageUrl || 'https://placehold.co/400x400.png'}
          alt={product.name}
          fill
          className={styles.image}
          priority={shouldUsePriority}
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className={styles.details}>
        <p className={styles.brand}>{product.brand}</p>
        <div className={styles.info}>
          <h3 className={styles.name}>
            {product.name}
          </h3>
          {showPrice && <p className={styles.price}>{product.basePrice} EUR</p>}
        </div>
      </div>
      <Link
        href={`/product/${product.id}`}
        className={styles.link}
        prefetch={true}
      >
        <span className="sr-only">View details for {product.name}</span>
      </Link>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
