"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface ViewportConfig {
  minItems?: number;
  maxItems?: number;
}

export const useViewportItems = (config: ViewportConfig = {}) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const [dimensions, setDimensions] = useState({
    itemHeight: 200,
    itemGap: 24,
    headerHeight: 80,
    searchHeight: 60,
    resultsHeight: 40
  });

  const { minItems = 3, maxItems = 8 } = config;

  const headerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);

  const calculateDimensions = useCallback(() => {
    const newDimensions = { ...dimensions };

    if (headerRef.current) {
      newDimensions.headerHeight = headerRef.current.getBoundingClientRect().height;
    }

    if (searchRef.current) {
      newDimensions.searchHeight = searchRef.current.getBoundingClientRect().height;
    }

    if (resultsRef.current) {
      newDimensions.resultsHeight = resultsRef.current.getBoundingClientRect().height;
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
    if (searchRef.current) resizeObserver.observe(searchRef.current);
    if (resultsRef.current) resizeObserver.observe(resultsRef.current);
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
      dimensions.searchHeight - 
      dimensions.resultsHeight - 
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
      searchRef,
      resultsRef,
      itemsRef
    }
  };
};
