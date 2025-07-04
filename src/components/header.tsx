"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Cart } from './cart';

export const Header = () => {
  return (
    <header className="flex items-center justify-between pt-6 pb-6 border-b border-gray-200">
      <Link href="/" prefetch={true}>
        <div className="relative" style={{ width: '100px', height: '24px' }}>
          <Image
            src="/images/MainIcon.svg"
            alt="MBST Logo"
            fill
            priority
          />
        </div>
      </Link>
      <Cart />
    </header>
  );
};
