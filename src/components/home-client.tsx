'use client';

import { useState, useMemo, useCallback } from 'react';
import { ProductCard } from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { useViewportItems } from '@/hooks/use-viewport-items';
import styles from './home-client.module.css';
import type { ProductListItem } from '@/lib/types';

const HomeClient = ({ products }: { products: ProductListItem[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { visibleItems, refs } = useViewportItems();

  const filteredProducts = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return products;
    return products.filter((product: ProductListItem) =>
      product.name.toLowerCase().includes(trimmedQuery) ||
      product.brand.toLowerCase().includes(trimmedQuery)
    );
  }, [searchQuery, products]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <main>
      <div ref={refs.searchRef} className={styles.searchContainer}>
        <label htmlFor="search" className="sr-only">Search for a smartphone</label>
        <Input
          id="search"
          type="text"
          placeholder="Search for a smartphone..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      <div ref={refs.resultsRef} className={styles.resultsBar} role="status">
        <p className={styles.resultsText}>
          {`${filteredProducts.length} results`}
        </p>
      </div>
      <ul ref={refs.itemsRef} className={styles.grid} role="list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: ProductListItem, index: number) => (
            <li key={`${product.id}-${index}`} role="listitem">
              <ProductCard product={product} priority={index < visibleItems} />
            </li>
          ))
        ) : (
          <div className={styles.noProducts}>
            <h2 className={styles.noProductsTitle}>No Products Found</h2>
            <p className={styles.noProductsText}>Try adjusting your search.</p>
          </div>
        )}
      </ul>
    </main>
  );
};

export default HomeClient; 