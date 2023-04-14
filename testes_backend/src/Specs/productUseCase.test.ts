import { IProductsDatabase, IStoreItem } from '../Databases/productsDatabase';
import { IProductFinder, ProductFinder } from '../useCases/productFinder';
import {expect} from '@jest/globals';

describe('ProductFinder', () => {
  let productsDatabase: jest.Mocked<IProductsDatabase>;
  let productFinder: IProductFinder;

  beforeEach(() => {
    productsDatabase = {
        products: [
            { id: 1, image: "image1", name: "product1", price: 10, category: "category1", weight: 1 },
            { id: 2, image: "image2", name: "product2", price: 20, category: "category2", weight: 2 },
            { id: 3, image: "image3", name: "product3", price: 30, category: "category3", weight: 3 },
            ],
        getItemById: jest.fn(),
        getItemByName: jest.fn(),
        getProducts: jest.fn(),
    } as jest.Mocked<IProductsDatabase>;

    productFinder = new ProductFinder(productsDatabase);
  });

  describe('getProduct', () => {
    it('should return the product with the given id', async () => {
      const expectedProduct = { id: 1, name: 'Product 1', price: 10 } as IStoreItem;
      productsDatabase.getItemById.mockReturnValueOnce(expectedProduct);

      const result = await productFinder.getProduct(1);

      expect(result).toBe(JSON.stringify(expectedProduct));
      expect(productsDatabase.getItemById).toHaveBeenCalledWith(1);
    });

    it('should reject with an error message when the product does not exist', async () => {
      productsDatabase.getItemById.mockReturnValueOnce(undefined);

      await expect(productFinder.getProduct(1)).rejects.toBe('Product does not exist!');
      expect(productsDatabase.getItemById).toHaveBeenCalledWith(1);
    });
  });

  describe('getProducts', () => {
    it('should return a list of products within the specified range', async () => {
      const expectedProducts = [
        { id: 1, name: 'Product 1', price: 10 } as IStoreItem,
        { id: 2, name: 'Product 2', price: 20 } as IStoreItem,
      ];
      productsDatabase.getProducts.mockReturnValueOnce(expectedProducts);

      const result = await productFinder.getProducts(0, 2);

      expect(result).toBe(JSON.stringify(expectedProducts));
      expect(productsDatabase.getProducts).toHaveBeenCalledWith(0, 2);
    });

    it('should reject with an error message when there are no more products to load', async () => {
      productsDatabase.getProducts.mockReturnValueOnce([]);

      await expect(productFinder.getProducts(0, 2)).rejects.toBe("There's more products to load");
      expect(productsDatabase.getProducts).toHaveBeenCalledWith(0, 2);
    });
  });

  describe('findProduct', () => {
    it('should return the product with the given name', async () => {
      const expectedProduct = { id: 1, name: 'Product 1', price: 10 } as IStoreItem;
      productsDatabase.getItemByName.mockReturnValueOnce(expectedProduct);

      const result = await productFinder.findProduct('Product 1');

      expect(result).toBe(JSON.stringify(expectedProduct));
      expect(productsDatabase.getItemByName).toHaveBeenCalledWith('Product 1');
    });

    it('should reject with an error message when the product does not exist', async () => {
      productsDatabase.getItemByName.mockReturnValueOnce(undefined);

      await expect(productFinder.findProduct('Nonexistent Product')).rejects.toBe('Product does not exist!');
      expect(productsDatabase.getItemByName).toHaveBeenCalledWith('Nonexistent Product');
    });
  });
});