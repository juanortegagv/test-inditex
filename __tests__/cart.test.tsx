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
  {
    id: "2",
    name: "Product 2",
    price: 20,
    image: "/image2.png",
    quantity: 2,
    selectedColor: "Blue",
    selectedStorage: "128GB",
  },
];

describe("Cart", () => {
  beforeEach(() => {
    mockedUseCart.mockClear();
  });

  it("renders the cart page with multiple products and correct totals", () => {
    mockedUseCart.mockReturnValue({
      cartItems: mockCartItems,
      removeFromCart: jest.fn(),
      totalPrice: 50,
      cartCount: 3,
    });

    render(<CartPage />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getAllByTestId("cart-item-price")[0]).toHaveTextContent("10 EUR");
    expect(screen.getAllByTestId("cart-item-price")[1]).toHaveTextContent("20 EUR");
    expect(screen.getByText(/Red/)).toBeInTheDocument();
    expect(screen.getByText(/Blue/)).toBeInTheDocument();
    expect(screen.getByText(/64GB/)).toBeInTheDocument();
    expect(screen.getByText(/128GB/)).toBeInTheDocument();
    expect(screen.getAllByText("Remove").length).toBe(2);
    const totals = screen.getAllByText("50 EUR");
    expect(totals.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('heading', { name: /Cart/i })).toBeInTheDocument();
  });

  it("removes a product and updates the cart", () => {
    const removeFromCartMock = jest.fn();
    mockedUseCart.mockReturnValue({
      cartItems: mockCartItems,
      removeFromCart: removeFromCartMock,
      totalPrice: 50,
      cartCount: 3,
    });
    render(<CartPage />);
    const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
    fireEvent.click(removeButtons[0]);
    expect(removeFromCartMock).toHaveBeenCalledWith("1", "Red", "64GB");
  });

  it("shows empty state when cart is empty", () => {
    mockedUseCart.mockReturnValue({
      cartItems: [],
      removeFromCart: jest.fn(),
      totalPrice: 0,
      cartCount: 0,
    });
    render(<CartPage />);
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Cart/i })).toBeInTheDocument();
  });

  it("has accessible buttons and summary", () => {
    mockedUseCart.mockReturnValue({
      cartItems: mockCartItems,
      removeFromCart: jest.fn(),
      totalPrice: 50,
      cartCount: 3,
    });
    render(<CartPage />);
    const payButtons = screen.getAllByRole('button', { name: /Pay/i });
    expect(payButtons.length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('button', { name: /Remove/i }).length).toBe(2);
    const continueLinks = screen.getAllByRole('link', { name: /Continue Shopping/i });
    expect(continueLinks.length).toBeGreaterThanOrEqual(2);
  });
});
