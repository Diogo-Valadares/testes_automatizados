import { IUserDatabase } from "../Databases/UserDatabase";
import { IUserCartManager, UserCartManager } from "../useCases/cartManagement";
import {expect} from '@jest/globals';

describe("UserCartManager", () => {
  let userDatabaseMock: jest.Mocked<IUserDatabase>;
  let userCartManager: IUserCartManager;

  beforeEach(() => {
    userDatabaseMock = {
        userList: [],
        createUser: jest.fn(),
        findUserByEmail: jest.fn(),
        findUserById: jest.fn(),
        getUserCart: jest.fn(),
        addToUserCart: jest.fn(),
        removeFromUserCart: jest.fn(),
        userExists: jest.fn(),
        destroyUser: jest.fn()
      };
    userCartManager = new UserCartManager(userDatabaseMock);
  });

  describe("getUserCart", () => {
    it("should return the user cart if it exists", async () => {
      const userId = 1;
      const userCart: [number, number][] = [[1, 2],[2, 1],];
      userDatabaseMock.getUserCart.mockReturnValue(userCart);

      const result = await userCartManager.getUserCart(userId);

      expect(userDatabaseMock.getUserCart).toHaveBeenCalledWith(userId);
      expect(result).toEqual(JSON.stringify(userCart));
    });

    it("should reject with an error message if the user cart doesn't exist", async () => {
      const userId = 1;
      userDatabaseMock.getUserCart.mockReturnValue(undefined);

      await expect(userCartManager.getUserCart(userId)).rejects.toEqual("Internal Error!");
      expect(userDatabaseMock.getUserCart).toHaveBeenCalledWith(userId);
    });
  });

  describe("addToUserCart", () => {
    it("should add the item to the user cart and return a success message", async () => {
      const userId = 1;
      const itemId = 1;
      userDatabaseMock.addToUserCart.mockReturnValue(true);

      const result = await userCartManager.addToUserCart(userId, itemId);

      expect(userDatabaseMock.addToUserCart).toHaveBeenCalledWith(userId, itemId);
      expect(result).toEqual("Product added successfuly!");
    });

    it("should reject with an error message if the item could not be added to the user cart", async () => {
      const userId = 1;
      const itemId = 1;
      userDatabaseMock.addToUserCart.mockReturnValue(false);

      await expect(userCartManager.addToUserCart(userId, itemId)).rejects.toEqual("Internal Error");
      expect(userDatabaseMock.addToUserCart).toHaveBeenCalledWith(userId, itemId);
    });
  });

  describe("removeFromUserCart", () => {
    it("should remove the item from the user cart and return a success message", async () => {
      const userId = 1;
      const itemId = 1;
      userDatabaseMock.removeFromUserCart.mockReturnValue(true);

      const result = await userCartManager.removeFromUserCart(userId, itemId);

      expect(userDatabaseMock.removeFromUserCart).toHaveBeenCalledWith(userId, itemId);
      expect(result).toEqual("Product removed successfuly!");
    });

    it("should reject with an error message if the item could not be removed from the user cart", async () => {
      const userId = 1;
      const itemId = 1;
      userDatabaseMock.removeFromUserCart.mockReturnValue(false);

      await expect(userCartManager.removeFromUserCart(userId, itemId)).rejects.toEqual("Internal Error!");
      expect(userDatabaseMock.removeFromUserCart).toHaveBeenCalledWith(userId, itemId);
    });
  });
});