import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { ProductDetail } from '@/lib/types';
import { Dispatch, SetStateAction } from 'react';
import styles from '../app/product/[id]/product.module.css';

interface ProductMainInfoProps {
  product: ProductDetail;
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  selectedStorage: string;
  setSelectedStorage: Dispatch<SetStateAction<string>>;
  selectedPrice: number | null;
  handleAddToCart: () => void;
}

const ProductMainInfo = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedStorage,
  setSelectedStorage,
  selectedPrice,
  handleAddToCart,
}: ProductMainInfoProps) => (
  <>
    <h1 className={styles.title}>{product.name}</h1>
    <p className={styles.price}>
      {selectedPrice !== null
        ? `${selectedPrice.toLocaleString()} EUR`
        : product.storageOptions && product.storageOptions.length > 0
          ? `FROM ${Math.min(...product.storageOptions.map(opt => opt.price)).toLocaleString()} EUR`
          : ''}
    </p>
    <div className={styles.optionsContainer}>
      {product.storageOptions && product.storageOptions.length > 0 && (
        <div>
          <h3 className={styles.optionGroupLabel}>Storage. HOW MUCH SPACE DO YOU NEED?</h3>
          <RadioGroup value={selectedStorage} onValueChange={setSelectedStorage} className={styles.storageOptions}>
            {product.storageOptions.map((storage: { capacity: string }, index: number) => (
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
            {product.colorOptions.map((color: { name: string; hexCode?: string }, index: number) => (
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
  </>
);

export default ProductMainInfo; 