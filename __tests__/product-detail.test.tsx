import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetailPage from "@/app/product/[id]/page";
import { ProductDetail as ProductDetailType, ProductListItem } from "@/lib/types";
import { CartProvider } from "@/context/cart-context";
import { getProductById } from "@/lib/api";
import { useProduct } from "@/context/product-context";

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' }),
  useRouter: () => ({ back: jest.fn() }),
  notFound: jest.fn(),
}));

jest.mock("@/lib/api");
jest.mock("@/context/product-context");

const mockedGetProductById = getProductById as jest.Mock;
const mockedUseProduct = useProduct as jest.Mock;

const mockProductDetail: ProductDetailType = {
  id: "1",
  name: "Product 1",
  basePrice: 10,
  description: "Description 1",
  brand: "Brand 1",
  rating: 4.5,
  specs: {},
  colorOptions: [],
  storageOptions: [],
  similarProducts: [],
  imageUrl: "/image1.png",
};

const mockSimilarProducts: ProductListItem[] = [];

describe("ProductDetail", () => {
  it("should render the product detail page and reveal description on click", async () => {
    mockedGetProductById.mockResolvedValue(mockProductDetail);
    mockedUseProduct.mockReturnValue({ products: mockSimilarProducts, loading: false });

    render(
      <CartProvider>
        <ProductDetailPage />
      </CartProvider>
    );

    expect(await screen.findByText("Product 1")).toBeInTheDocument();

    const specificationsTrigger = screen.getByText("SPECIFICATIONS");
    fireEvent.click(specificationsTrigger);

    expect(await screen.findByText("Description 1")).toBeInTheDocument();
  });
});
