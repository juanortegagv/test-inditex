"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { memo } from 'react';

export const Cart = memo(() => {
  const { cartCount } = useCart();

  return (
    <Link href="/cart" className="flex items-center gap-2" prefetch={true} aria-label={`Shopping Cart with ${cartCount} items`}>
      <div className="relative" style={{ width: '19px', height: '19px' }}>
        <Image
          src="/images/Cart.svg"
          alt=""
          fill
          aria-hidden="true"
          priority
        />
      </div>
      <span className="font-light text-gray-800">{cartCount}</span>
    </Link>
  );
});

Cart.displayName = 'Cart';
