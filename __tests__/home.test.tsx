import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { ProductListItem } from '@/lib/types';
import HomeClient from '@/components/home-client';

describe('Home Page', () => {
  const mockProducts: ProductListItem[] = [
    { id: '1', name: 'Phone A', brand: 'Brand A', basePrice: 100, imageUrl: '' },
    { id: '2', name: 'Phone B', brand: 'Brand B', basePrice: 200, imageUrl: '' },
    { id: '3', name: 'Phone C', brand: 'Brand A', basePrice: 300, imageUrl: '' },
  ];

  it('renders the search input and is accessible', () => {
    render(<HomeClient products={mockProducts} />);
    const searchInput = screen.getByPlaceholderText(/Search for a smartphone.../i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAccessibleName();
  });

  it('renders with products and correct result count', () => {
    render(<HomeClient products={mockProducts} />);
    const resultsText = screen.getByText(/3 results/i);
    expect(resultsText).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Phone A/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Phone B/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Phone C/i })).toBeInTheDocument();
  });

  it('filters products by search (name and brand)', () => {
    render(<HomeClient products={mockProducts} />);
    const searchInput = screen.getByPlaceholderText(/Search for a smartphone.../i);
    fireEvent.change(searchInput, { target: { value: 'Phone B' } });
    expect(screen.getByRole('heading', { name: /Phone B/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Phone A/i })).not.toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Brand A' } });
    expect(screen.getByRole('heading', { name: /Phone A/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Phone C/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Phone B/i })).not.toBeInTheDocument();
  });

  it('shows no products found message and correct roles', () => {
    render(<HomeClient products={[]} />);
    const noProductsText = screen.getByText(/No Products Found/i);
    expect(noProductsText).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders the product grid and items with correct roles', () => {
    render(<HomeClient products={mockProducts} />);
    const grid = screen.getByRole('list');
    expect(grid).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
  });
});
