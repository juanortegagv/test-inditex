import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import { ProductContext } from '@/context/product-context';
import type { ProductListItem } from '@/lib/types';

const renderWithProductContext = (
  ui: React.ReactElement,
  providerProps: any
) => {
  return render(
    <ProductContext.Provider value={providerProps}>{ui}</ProductContext.Provider>
  );
};

describe('Home Page', () => {
  it('renders the search input and loading state', () => {
    const providerProps = {
      products: [],
      loading: true,
      error: null,
      searchQuery: '',
      setSearchQuery: jest.fn(),
      productCount: 0,
    };

    renderWithProductContext(<Home />, providerProps);

    const searchInput = screen.getByPlaceholderText(/Search for a smartphone.../i);
    expect(searchInput).toBeInTheDocument();

    const loadingText = screen.getByText(/searching.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it('renders with products and correct result count', () => {
    const mockProducts: ProductListItem[] = [
      { id: '1', name: 'Phone A', brand: 'Brand A', basePrice: 100, imageUrl: '' },
      { id: '2', name: 'Phone B', brand: 'Brand B', basePrice: 200, imageUrl: '' },
    ];
    const providerProps = {
      products: mockProducts,
      loading: false,
      error: null,
      searchQuery: '',
      setSearchQuery: jest.fn(),
      productCount: mockProducts.length,
    };

    renderWithProductContext(<Home />, providerProps);

    const resultsText = screen.getByText(/2 results/i);
    expect(resultsText).toBeInTheDocument();

    const productAElements = screen.getAllByText(/Phone A/i);
    const productBElements = screen.getAllByText(/Phone B/i);
    expect(productAElements.length).toBeGreaterThan(0);
    expect(productBElements.length).toBeGreaterThan(0);
    
    const productAHeading = screen.getByRole('heading', { name: /Phone A/i });
    const productBHeading = screen.getByRole('heading', { name: /Phone B/i });
    expect(productAHeading).toBeInTheDocument();
    expect(productBHeading).toBeInTheDocument();
  });

  it('shows an error message when there is an error', () => {
    const providerProps = {
      products: [],
      loading: false,
      error: 'Failed to fetch',
      searchQuery: '',
      setSearchQuery: jest.fn(),
      productCount: 0,
    };
    renderWithProductContext(<Home />, providerProps);

    const errorText = screen.getByText(/Failed to fetch/i);
    expect(errorText).toBeInTheDocument();
  });

  it('shows no products found message', () => {
    const providerProps = {
      products: [],
      loading: false,
      error: null,
      searchQuery: 'something that does not exist',
      setSearchQuery: jest.fn(),
      productCount: 0,
    };
    renderWithProductContext(<Home />, providerProps);

    const noProductsText = screen.getByText(/No Products Found/i);
    expect(noProductsText).toBeInTheDocument();
  });
});
