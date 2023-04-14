import fs from 'fs';
import storeItem, { IStoreItem } from '../Entities/storeItem';
import { ProductsDatabase } from '../Databases/productsDatabase';

describe('ProductsDatabase', () => {
  let productsDatabase: ProductsDatabase;

  beforeEach(() => {
    fs.writeFileSync('data/productTest.json', JSON.stringify([]));
    const products: IStoreItem[] = [
      new storeItem(0, '', 'Product 0', 10, '', 1),
      new storeItem(1, '', 'Product 1', 20, '', 2),
      new storeItem(2, '', 'Product 2', 30, '', 3),
      new storeItem(3, '', 'Product 3', 40, '', 4),
      new storeItem(4, '', 'Product 4', 50, '', 5),
      new storeItem(5, '', 'Product 5', 60, '', 6),
    ];
    fs.writeFileSync('data/productTest.json', JSON.stringify(products));
    productsDatabase = new ProductsDatabase('productTest');
  });

  describe('Filename changes', () => {
    it('should use the default filename "products" when no filename is provided', () => {
      const database = new ProductsDatabase();
      expect(database.filePath).toBe('products');
    });

    it('should use the provided filename when a filename is provided', () => {
      const database = new ProductsDatabase('productTest');
      expect(database.filePath).toBe('productTest');
    });
  });

  describe('getItemById', () => {
    it('should return the item with the given id', () => {
      const item = productsDatabase.getItemById(1);
      expect(item?.name).toBe('Product 1');
    });

    it('should return undefined when the id is not found', () => {
      const item = productsDatabase.getItemById(999);
      expect(item).toBeUndefined();
    });
  });

  describe('getItemByName', () => {
    it('should return the item with the given name', () => {
      const item = productsDatabase.getItemByName('Product 2');
      expect(item?.id).toBe(2);
    });

    it('should return undefined when the name is not found', () => {
      const item = productsDatabase.getItemByName('Nonexistent Product');
      expect(item).toBeUndefined();
    });
  });

  describe('getProducts', () => {
    it('should return an array of products of the correct length', () => {
      const products = productsDatabase.getProducts(0, 3);
      expect(products.length).toBe(3);
    });

    it('should return the correct products for a given page and page size', () => {
      const products = productsDatabase.getProducts(1, 2);
      expect(products.map((p:IStoreItem) => p.id)).toEqual([2, 3]);
    });
  });
});