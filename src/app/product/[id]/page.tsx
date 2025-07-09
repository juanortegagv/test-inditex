import { getProductById } from "@/lib/api";
import ProductDetailClient from "@/components/product-detail-client";

const ProductPage = async ({ params }: { params: { id: string } } | { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const product = await getProductById(id);
  return <ProductDetailClient product={product} />;
};

export default ProductPage;
