"use client";

import { useProduct } from '@/context/product-context';
import { ProductCard } from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import styles from './home.module.css';

const Home = () => {
  const { 
    products, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery,
    productCount
  } = useProduct();

  return (
    <main>
      <div className={styles.searchContainer}>
        <label htmlFor="search" className="sr-only">Search for a smartphone</label>
        <Input
          id="search"
          type="text"
          placeholder="Search for a smartphone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.resultsBar} role="status">
        <p className={styles.resultsText}>
          {loading ? 'searching...' : `${productCount} results`}
        </p>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.grid}>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
                <div className={styles.skeletonImageContainer}>
                    <Skeleton className={styles.skeletonImage} />
                </div>
                <div className={styles.skeletonDetails}>
                  <div className={styles.skeletonInfo}>
                    <Skeleton className={styles.skeletonName} />
                    <Skeleton className={styles.skeletonPrice} />
                  </div>
                  <Skeleton className={styles.skeletonDescription} />
                </div>
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 10} />
          ))
        ) : (
          !error && (
            <div className={styles.noProducts}>
              <h2 className={styles.noProductsTitle}>No Products Found</h2>
              <p className={styles.noProductsText}>Try adjusting your search.</p>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default Home;
