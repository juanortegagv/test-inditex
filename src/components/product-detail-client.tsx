"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/context/cart-context";
import ProductMainInfo from "./product-main-info";
import ProductExtraInfo from "./product-extra-info";
import ProductSkeleton from "./product-skeleton";
import styles from "../app/product/[id]/product.module.css";
import type { ProductDetail } from "@/lib/types";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductDetailClientProps {
  product: ProductDetail;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colorOptions?.[0]?.name || ""
  );
  const [selectedStorage, setSelectedStorage] = useState<string>("");

  const selectedPrice = useMemo(() => {
    if (!product || !selectedStorage) return null;
    const storageOption = product.storageOptions.find(
      (opt) => opt.capacity === selectedStorage
    );
    return storageOption?.price ?? null;
  }, [product, selectedStorage]);

  const selectedImage = useMemo(() => {
    if (!product) return "https://placehold.co/600x600.png";
    const colorOption = product.colorOptions?.find(
      (c) => c.name === selectedColor
    );
    return (
      colorOption?.imageUrl ||
      product.colorOptions?.[0]?.imageUrl ||
      "https://placehold.co/600x600.png"
    );
  }, [product, selectedColor]);

  const handleAddToCart = () => {
    if (product && selectedColor && selectedStorage && selectedPrice) {
      const itemToAdd = {
        id: product.id,
        name: product.name,
        price: selectedPrice,
        image: selectedImage,
      };
      addToCart(itemToAdd, selectedColor, selectedStorage);
    }
  };

  if (!product) return <ProductSkeleton />;

  return (
    <div>
      <button onClick={() => router.back()} className={styles.backButton}>
        <ChevronLeft className={styles.backButtonIcon} />
        Back
      </button>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <Image
                key={selectedImage}
                src={selectedImage}
                alt={`${product.name} - ${selectedColor || ""}`}
                fill
                className={styles.image}
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <ProductMainInfo
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedStorage={selectedStorage}
              setSelectedStorage={setSelectedStorage}
              selectedPrice={selectedPrice}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>

        <ProductExtraInfo
          description={product.description}
          specs={product.specs}
          similarProducts={product.similarProducts}
        />
      </div>
    </div>
  );
};

export default ProductDetailClient;
