import { IUserDatabase } from '@src/Databases/UserDatabase';
import { IUserManagement, UserManagement } from '../useCases/userManagement';
import { expect } from '@jest/globals';

describe('userManagement', () => {
  let mockUserDatabase: jest.Mocked<IUserDatabase>;
  let userManagement: IUserManagement;

  beforeEach(() => {
    mockUserDatabase = {
      userList: [],
      createUser: jest.fn(),
      findUserByEmail: jest.fn(),
      findUserById: jest.fn(),
      userExists: jest.fn(),
      destroyUser: jest.fn(),
      getUserCart: jest.fn(),
      addToUserCart: jest.fn(),
      removeFromUserCart: jest.fn()      
    };
    userManagement = new UserManagement(mockUserDatabase);
  });

  describe('login', () => {
    it('should reject if user is not found', async () => {
      const email = 'test@test.com';
      const password = 'password';

      mockUserDatabase.findUserByEmail = jest.fn().mockReturnValue(undefined);

      await expect(userManagement.checkLoginData(email, password)).rejects.toThrow('User not found');
    });

    it('should reject if password is incorrect', async () => {
      const email = 'test@test.com';
      const password = 'password';
      const mockUser = { id: 1, password: 'otherPassword' };

      mockUserDatabase.findUserByEmail = jest.fn().mockReturnValue(mockUser);

      await expect(userManagement.checkLoginData(email, password)).rejects.toThrow("Password doesn't match");
    });

    it('should return the user ID if login is successful', async () => {
      const email = 'test@test.com';
      const password = 'password';
      const mockUser = { id: 1, password: 'password' };

      mockUserDatabase.findUserByEmail = jest.fn().mockReturnValue(mockUser);

      await expect(userManagement.checkLoginData(email, password)).resolves.toBe(mockUser.id);
    });
  });

  describe('signUp', () => {
    it('should reject if user already exists', async () => {
      const email = 'test@test.com';
      const name = 'Test User';
      const password = 'password';

      mockUserDatabase.userExists.mockReturnValue(true);

      await expect(userManagement.signUp(email, name, password)).rejects.toThrow('User already exists!');
    });

    it('should create a new user and return success message', async () => {
      const email = 'test@test.com';
      const name = 'Test User';
      const password = 'password';

      mockUserDatabase.userExists.mockReturnValue(false);
      mockUserDatabase.createUser.mockReturnValue(true);

      await expect(userManagement.signUp(email, name, password)).resolves.toBe('User sucessfully created!');
      expect(mockUserDatabase.createUser).toHaveBeenCalledWith(name, email, password);
    });

    it('should reject with internal error when createUser fails', async () => {
      const email = 'test@test.com';
      const name = 'Test User';
      const password = 'password';

      mockUserDatabase.createUser.mockReturnValue(false);
      mockUserDatabase.userExists.mockReturnValue(false);

      await expect(userManagement.signUp(email, name, password)).rejects.toThrow('Internal Error');
    });
    
    describe('getUserData', () => {
      it('should reject with error message if user does not exist', async () => {
        const userId = 1;
        mockUserDatabase.findUserById.mockReturnValue(undefined),

        await expect(userManagement.getUserData(userId)).rejects.toThrow('Internal database error!');
        expect(mockUserDatabase.findUserById).toHaveBeenCalledWith(userId);
      });
    
      it('should return user data without sensitive fields', async () => {
        const userId = 1;        
        const user = { id: userId, name: 'Test User', email: 'test@test.com', password: 'password' , carrinho: []};        
        mockUserDatabase.findUserById.mockReturnValue(user);

        const expectedData = '{"name":"Test User","email":"test@test.com"}';
        
        await expect(userManagement.getUserData(userId)).resolves.toBe(expectedData);
        expect(mockUserDatabase.findUserById).toHaveBeenCalledWith(userId);
      });
    });
  });
});