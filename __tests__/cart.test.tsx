import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "@/app/cart/page";
import { CartItem } from "@/lib/types";
import { useCart } from "@/context/cart-context";

jest.mock("@/context/cart-context", () => ({
  useCart: jest.fn(),
}));

const mockedUseCart = useCart as jest.Mock;

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Product 1",
    price: 10,
    image: "/image1.png",
    quantity: 1,
    selectedColor: "Red",
    selectedStorage: "64GB",
  },
];

describe("Cart", () => {
  beforeEach(() => {
    mockedUseCart.mockClear();
  });

  it("should render the cart page with products", () => {
    mockedUseCart.mockReturnValue({
      cartItems: mockCartItems,
      removeFromCart: jest.fn(),
      totalPrice: 10,
      cartCount: 1,
    });

    render(<CartPage />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("10 EUR")).toBeInTheDocument();
    expect(screen.getByText(/Red/)).toBeInTheDocument();
    expect(screen.getByText(/64GB/)).toBeInTheDocument();
  });

  it("should call removeFromCart when the remove button is clicked", () => {
    const removeFromCartMock = jest.fn();
    mockedUseCart.mockReturnValue({
      cartItems: mockCartItems,
      removeFromCart: removeFromCartMock,
      totalPrice: 10,
      cartCount: 1,
    });

    render(<CartPage />);
    
    const removeButton = screen.getByText("Eliminar");
    fireEvent.click(removeButton);

    expect(removeFromCartMock).toHaveBeenCalledWith("1", "Red", "64GB");
  });
});
