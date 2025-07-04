"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface ItemToAdd {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (itemToAdd: ItemToAdd, selectedColor: string, selectedStorage: string) => void;
  removeFromCart: (itemId: string, color: string, storage: string) => void;
  cartCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const items = localStorage.getItem('cartItems');
      if (items) {
        setCartItems(JSON.parse(items));
      }
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage", error);
    }
  }, [cartItems]);

  const addToCart = (itemToAdd: ItemToAdd, selectedColor: string, selectedStorage: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item =>
          item.id === itemToAdd.id &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemToAdd.id &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...itemToAdd,
            quantity: 1,
            selectedColor,
            selectedStorage,
          },
        ];
      }
    });
    
    toast({
        title: "Added to cart",
        description: `${itemToAdd.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: string, color: string, storage: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === itemId && item.selectedColor === color && item.selectedStorage === storage))
    );
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
