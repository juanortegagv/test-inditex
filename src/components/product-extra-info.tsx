import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProductCard } from './product-card';
import styles from '../app/product/[id]/product.module.css';
import type { ProductListItem } from '@/lib/types';

interface ProductExtraInfoProps {
  description: string;
  specs: Record<string, string>;
  similarProducts: ProductListItem[];
}

const ProductExtraInfo = ({ description, specs, similarProducts }: ProductExtraInfoProps) => (
  <>
    <div className={styles.accordionSection}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className={styles.accordionTrigger}>SPECIFICATIONS</AccordionTrigger>
          <AccordionContent>
            {description}
            {specs && Object.keys(specs).length > 0 && (
              <ul className={styles.specList}>
                {(Object.entries(specs) as [string, string][]).map(([key, value]) => (
                  <li key={key}><strong>{key.toUpperCase()}:</strong> {value}</li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    {similarProducts && similarProducts.length > 0 && (
      <div className={styles.relatedProductsSection}>
        <h2 className={styles.relatedProductsTitle}>RELATED PRODUCTS</h2>
        <div className={styles.relatedProductsGrid}>
          {similarProducts.map((similarProduct, index) => (
            <ProductCard key={`${similarProduct.id}-${index}`} product={similarProduct} showPrice={false} />
          ))}
        </div>
      </div>
    )}
  </>
);

export default ProductExtraInfo; 