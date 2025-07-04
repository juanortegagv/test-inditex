"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getProducts } from '@/lib/api';
import type { ProductListItem } from '@/lib/types';

interface ProductContextType {
  products: ProductListItem[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  productCount: number;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [allProducts, setAllProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts();
        if (Array.isArray(data)) {
          const uniqueProductIds = new Set<string>();
          const uniqueProducts = data.filter((product: ProductListItem) => {
            if (!uniqueProductIds.has(product.id)) {
              uniqueProductIds.add(product.id);
              return true;
            }
            return false;
          });
          setAllProducts(uniqueProducts);
          setProducts(uniqueProducts);
        } else {
          console.error("API response is not an array:", data);
          setProducts([]);
          setAllProducts([]);
          setError('Received an unexpected response format from the server.');
        }
      } catch (err) {
        setError('Failed to fetch products. Please check the console for details.');
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    
    if (trimmedQuery === '') {
      setProducts(allProducts);
      return;
    }

    const filteredProducts = allProducts.filter(product => {
      const productName = product.name.toLowerCase();
      const productBrand = product.brand.toLowerCase();
      return productName.includes(trimmedQuery) || productBrand.includes(trimmedQuery);
    });
    
    setProducts(filteredProducts);

  }, [searchQuery, allProducts]);

  const productCount = products.length;

  return (
    <ProductContext.Provider value={{ products, loading, error, searchQuery, setSearchQuery, productCount }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
