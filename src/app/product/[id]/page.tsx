"use client";

import { useState, useEffect, useMemo } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/lib/api';
import type { ProductDetail } from '@/lib/types';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCard } from '@/components/product-card';
import styles from './product.module.css';

const ProductSkeleton = () => {
    return (
        <div className={styles.skeletonContainer}>
            <div className={styles.skeletonGrid}>
                <div className={styles.skeletonImageGroup}>
                    <Skeleton className={styles.skeletonBackButton} />
                    <Skeleton className={styles.skeletonImage} />
                </div>
                <div className={styles.skeletonDetailsGroup}>
                    <div className={styles.skeletonTitleGroup}>
                        <Skeleton />
                        <Skeleton />
                    </div>
                    <div className={styles.skeletonOptionsGroup}>
                        <div className={styles.skeletonOptionBlock}>
                            <Skeleton />
                            <div className={styles.skeletonBoxes}>
                                <Skeleton className={styles.skeletonBox} />
                                <Skeleton className={styles.skeletonBox} />
                            </div>
                        </div>
                        <div className={styles.skeletonOptionBlock}>
                            <Skeleton />
                            <div className={styles.skeletonCircles}>
                                <Skeleton className={styles.skeletonCircle} />
                                <Skeleton className={styles.skeletonCircle} />
                            </div>
                        </div>
                    </div>
                    <Skeleton className={styles.skeletonButton} />
                </div>
            </div>
            <div className={styles.skeletonAccordion}>
                <Skeleton className={styles.skeletonAccordionTrigger} />
            </div>
        </div>
    );
}

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (productId) {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getProductById(productId);
                setProduct(data);
                if (data && data.colorOptions && data.colorOptions.length > 0) {
                    setSelectedColor(data.colorOptions[0].name);
                }
            } catch {
                setError('Failed to fetch product details. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }
  }, [productId]);
  
  const fromPrice = useMemo(() => {
    if (!product) return null;
    if (!product.storageOptions || product.storageOptions.length === 0) return product.basePrice;
    return product.storageOptions[0].price;
  }, [product]);

  const selectedPrice = useMemo(() => {
    if (!product || !selectedStorage) return null;
    const storageOption = product.storageOptions.find(opt => opt.capacity === selectedStorage);
    return storageOption?.price ?? null;
  }, [product, selectedStorage]);

  const selectedImage = useMemo(() => {
    if (!product) return 'https://placehold.co/600x600.png';
    const colorOption = product.colorOptions?.find(c => c.name === selectedColor);
    return colorOption?.imageUrl || product.colorOptions?.[0]?.imageUrl || 'https://placehold.co/600x600.png';
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

  if (loading) return <ProductSkeleton />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) notFound();

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
                    alt={`${product.name} - ${selectedColor || ''}`}
                    fill
                    className={styles.image}
                    priority
                    sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
          </div>

          <div className={styles.detailsContainer}>
              <div>
                  <h1 className={styles.title}>{product.name}</h1>
                  <p className={styles.price}>
                    {selectedPrice !== null
                        ? `${isClient ? selectedPrice.toLocaleString() : selectedPrice} EUR`
                        : fromPrice !== null
                        ? `FROM ${isClient ? fromPrice.toLocaleString() : fromPrice} EUR`
                        : ''}
                  </p>
              </div>
              
              <div className={styles.optionsContainer}>
                  {product.storageOptions && product.storageOptions.length > 0 && (
                    <div>
                        <h3 className={styles.optionGroupLabel}>Storage. HOW MUCH SPACE DO YOU NEED?</h3>
                        <RadioGroup value={selectedStorage} onValueChange={setSelectedStorage} className={styles.storageOptions}>
                            {product.storageOptions.map((storage, index) => (
                            <div key={`${storage.capacity}-${index}`} className={styles.storageOption}>
                                <RadioGroupItem value={storage.capacity} id={`storage-${storage.capacity}-${index}`} className="sr-only" />
                                <Label
                                    htmlFor={`storage-${storage.capacity}-${index}`}
                                    className={`${styles.storageLabel} ${selectedStorage === storage.capacity ? styles.storageLabelSelected : ''}`}
                                >
                                  <span>{storage.capacity}</span>
                                </Label>
                            </div>
                            ))}
                        </RadioGroup>
                    </div>
                  )}

                  {product.colorOptions && product.colorOptions.length > 0 && (
                    <div>
                        <h3 className={styles.optionGroupLabel}>COLOR. PICK YOUR FAVOURITE.</h3>
                        <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className={styles.colorOptions}>
                            {product.colorOptions.map((color, index) => (
                            <div key={`${color.name}-${index}`}>
                                <RadioGroupItem value={color.name} id={`color-${color.name}-${index}`} className="sr-only" />
                                <Label
                                    htmlFor={`color-${color.name}-${index}`}
                                    className={`${styles.colorLabel} ${selectedColor === color.name ? styles.colorLabelSelected : ''}`}
                                >
                                    <div 
                                        className={styles.colorSwatch}
                                        style={{ backgroundColor: color.hexCode || '#E5E7EB' }}
                                    />
                                </Label>
                            </div>
                            ))}
                        </RadioGroup>
                        {selectedColor && <p className={styles.selectedColorName}>{selectedColor}</p>}
                    </div>
                  )}
              </div>

              <Button onClick={handleAddToCart} size="lg" className={styles.addToCartButton} disabled={!selectedStorage || !selectedColor}>
                  AÑADIR
              </Button>
          </div>
        </div>
        
        <div className={styles.accordionSection}>
          <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className={styles.accordionTrigger}>SPECIFICATIONS</AccordionTrigger>
                  <AccordionContent>
                      {product.description}
                      {product.specs && Object.keys(product.specs).length > 0 && (
                        <ul className={styles.specList}>
                            {Object.entries(product.specs).map(([key, value]) => (
                                <li key={key}><strong>{key.toUpperCase()}:</strong> {value}</li>
                            ))}
                        </ul>
                      )}
                  </AccordionContent>
              </AccordionItem>
          </Accordion>
        </div>

        {product.similarProducts && product.similarProducts.length > 0 && (
          <div className={styles.relatedProductsSection}>
            <h2 className={styles.relatedProductsTitle}>RELATED PRODUCTS</h2>
            <div className={styles.relatedProductsGrid}>
              {product.similarProducts.map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} showPrice={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
