"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Cart } from './cart';
import styles from './header.module.css';
import { memo } from 'react';

export const Header = memo(() => {
  return (
    <header className={styles.header}>
      <Link href="/" prefetch={true}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/MainIcon.svg"
            alt="MBST Logo"
            fill
            className={styles.logo}
            priority
          />
        </div>
      </Link>
      <Cart />
    </header>
  );
});

Header.displayName = 'Header';
