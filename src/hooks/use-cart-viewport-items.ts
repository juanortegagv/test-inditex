'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface CartViewportConfig {
  minItems?: number;
  maxItems?: number;
}

export const useCartViewportItems = (config: CartViewportConfig = {}) => {
  const [visibleItems, setVisibleItems] = useState(2);
  const [dimensions, setDimensions] = useState({
    itemHeight: 160,
    itemGap: 24,
    headerHeight: 80,
    cartTitleHeight: 60,
    summaryHeight: 120
  });

  const { minItems = 1, maxItems = 4 } = config;

  const headerRef = useRef<HTMLElement>(null);
  const cartTitleRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);

  const calculateDimensions = useCallback(() => {
    const newDimensions = { ...dimensions };

    if (headerRef.current) {
      newDimensions.headerHeight = headerRef.current.getBoundingClientRect().height;
    }

    if (cartTitleRef.current) {
      newDimensions.cartTitleHeight = cartTitleRef.current.getBoundingClientRect().height;
    }

    if (summaryRef.current) {
      newDimensions.summaryHeight = summaryRef.current.getBoundingClientRect().height;
    }

    if (itemsRef.current) {
      const items = itemsRef.current.children;
      if (items.length > 0) {
        const firstItem = items[0] as HTMLElement;
        const secondItem = items[1] as HTMLElement;
        
        newDimensions.itemHeight = firstItem.getBoundingClientRect().height;
        
        if (secondItem) {
          const firstRect = firstItem.getBoundingClientRect();
          const secondRect = secondItem.getBoundingClientRect();
          newDimensions.itemGap = secondRect.top - firstRect.bottom;
        }
      }
    }

    setDimensions(newDimensions);
  }, [dimensions]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      calculateDimensions();
    });

    if (headerRef.current) resizeObserver.observe(headerRef.current);
    if (cartTitleRef.current) resizeObserver.observe(cartTitleRef.current);
    if (summaryRef.current) resizeObserver.observe(summaryRef.current);
    if (itemsRef.current) resizeObserver.observe(itemsRef.current);


    const timeoutId = setTimeout(calculateDimensions, 100);

    const handleResize = () => {
      calculateDimensions();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [calculateDimensions]);

  useEffect(() => {
    const viewportHeight = window.innerHeight;
    const padding = 32;
    
    const availableHeight = viewportHeight - 
      dimensions.headerHeight - 
      dimensions.cartTitleHeight - 
      dimensions.summaryHeight - 
      padding;
    
    const totalItemHeight = dimensions.itemHeight + dimensions.itemGap;
    
    if (totalItemHeight <= 0) return;
    
    const itemsInViewport = Math.ceil(availableHeight / totalItemHeight);
    const clampedItems = Math.max(minItems, Math.min(itemsInViewport, maxItems));
    
    setVisibleItems(clampedItems);
  }, [dimensions, minItems, maxItems]);

  return {
    visibleItems,
    refs: {
      headerRef,
      cartTitleRef,
      summaryRef,
      itemsRef
    }
  };
}; 