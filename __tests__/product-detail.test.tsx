import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetailClient from "@/components/product-detail-client";
import { ProductDetail as ProductDetailType } from "@/lib/types";
import { CartProvider } from "@/context/cart-context";

const mockProductDetail: ProductDetailType = {
  id: "1",
  name: "Product 1",
  basePrice: 10,
  description: "Description 1",
  brand: "Brand 1",
  rating: 4.5,
  specs: { CPU: "Snapdragon", RAM: "8GB" },
  colorOptions: [
    { name: "Red", hexCode: "#ff0000", imageUrl: "/red.png" },
    { name: "Blue", hexCode: "#0000ff", imageUrl: "/blue.png" },
  ],
  storageOptions: [
    { capacity: "64GB", price: 10 },
    { capacity: "128GB", price: 20 },
  ],
  similarProducts: [
    { id: "2", name: "Product 2", brand: "Brand 2", basePrice: 15, imageUrl: "/image2.png" },
  ],
  imageUrl: "/image1.png",
};

describe("ProductDetail", () => {
  it("renders product detail and allows accordion interaction", async () => {
    render(
      <CartProvider>
        <ProductDetailClient product={mockProductDetail} />
      </CartProvider>
    );
    expect(await screen.findByText("Product 1")).toBeInTheDocument();
    const specificationsTrigger = screen.getByText("SPECIFICATIONS");
    fireEvent.click(specificationsTrigger);
    expect(await screen.findByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText(/CPU/i)).toBeInTheDocument();
    expect(screen.getByText(/Snapdragon/i)).toBeInTheDocument();
  });

  it("allows selecting color and storage, updates price, and enables add to cart", () => {
    render(
      <CartProvider>
        <ProductDetailClient product={mockProductDetail} />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByLabelText("128GB"));
    expect(screen.getByText("20 EUR")).toBeInTheDocument();
    
    const radios = screen.getAllByRole('radio');
    for (const radio of radios) {
      fireEvent.click(radio);
      if (screen.queryByText('Blue')) break;
    }
    expect(screen.getByText("Blue")).toBeInTheDocument();
    
    const addButton = screen.getByText("AÑADIR");
    expect(addButton).not.toBeDisabled();
  });

  it("renders related products section", () => {
    render(
      <CartProvider>
        <ProductDetailClient product={mockProductDetail} />
      </CartProvider>
    );
    expect(screen.getByText("RELATED PRODUCTS")).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Product 2/i })).toBeInTheDocument();
  });

  it("has accessible labels and roles", () => {
    render(
      <CartProvider>
        <ProductDetailClient product={mockProductDetail} />
      </CartProvider>
    );
    expect(screen.getByRole('heading', { name: /Product 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /AÑADIR/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /SPECIFICATIONS/i })).toBeInTheDocument();
  });
});
