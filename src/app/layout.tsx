import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';
import { CartProvider } from '@/context/cart-context';
import { ProductProvider } from '@/context/product-context';
import { Header } from '@/components/header';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Mobile Storefront',
  description: 'A modern mobile storefront.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={styles.body}>
        <CartProvider>
          <ProductProvider>
            <div className={styles.container}>
              <div className={styles.content}>
                <Header />
                <main className={styles.main}>
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
          </ProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}

export default RootLayout;
