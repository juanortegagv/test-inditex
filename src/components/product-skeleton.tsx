import { Skeleton } from '@/components/ui/skeleton';
import styles from '@/app/product/[id]/product.module.css';

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

export default ProductSkeleton; 