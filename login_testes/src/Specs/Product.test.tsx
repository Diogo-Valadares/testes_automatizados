import React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import ProductGrid from '../PageComponents/Product';
import axios, { AxiosInstance } from 'axios';

const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      image: 'image1.jpg',
      price: 10,
      weight: 100,
      cartCount: 0,
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'image2.jpg',
      price: 20,
      weight: 200,
      cartCount: 0,
    },
  ];

test('renders ProductGrid component without crashing', () => {
  render(<ProductGrid />);
});
  
  test('renders products correctly', () => {
    const { getAllByRole } = render(<ProductGrid />);
    const productElements = getAllByRole('griditem');
    expect(productElements.length).toBe(mockProducts.length);
    productElements.forEach((productElement, index) => {
      const { getByText, getByAltText } = within(productElement);
      expect(getByAltText(mockProducts[index].name)).toBeInTheDocument();
      expect(getByText(mockProducts[index].name)).toBeInTheDocument();
      expect(getByText(`$${mockProducts[index].price}`)).toBeInTheDocument();
    });
  });
  
test('clicking add to cart button increases cart count', async () => {
  let ax = axios.create() as jest.Mocked<AxiosInstance>;
  ax.get.mockResolvedValue({ status: 200 });
  const { getAllByRole } = render(<ProductGrid />);
  const productElements = getAllByRole('griditem');
  const productToBeAdded = mockProducts[0];
  const addToCartButton = within(productElements[0]).getByText('Add to Cart');
  fireEvent.click(addToCartButton);
  await waitFor(() => expect(axios.get).toHaveBeenCalledWith('/api/addToCart', { params: { authToken: null, product: productToBeAdded.id } }));
  const cartCountText = within(productElements[0]).getByText(`${productToBeAdded.cartCount + 1} in your cart.`);
  expect(cartCountText).toBeInTheDocument();
});