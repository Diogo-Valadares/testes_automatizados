import { IUserDatabase } from '@src/Databases/UserDatabase';
import { ISectionManager, section } from '@src/Databases/sectionManager';
import { IUserManagement, UserManagement } from '../useCases/userManagement';
import {expect} from '@jest/globals';

describe('userManagement', () => {
  let mockUserDatabase: IUserDatabase;
  let mockSectionManager: ISectionManager;

  let userManagement: IUserManagement;

  beforeEach(() => {
    mockUserDatabase = {
        userList: [],
        createUser: jest.fn(),
        findUserByEmail: jest.fn(),
        findUserById: jest.fn(),
        userExists: jest.fn(),
        destroyUser: jest.fn()
    };
    mockSectionManager = {
        createSection: jest.fn(),
        destroySection: jest.fn(),
        getUserID: jest.fn(),
        activeSections: new Array<section>
    };
    userManagement = new UserManagement(mockUserDatabase, mockSectionManager);
  });

  describe('login', () => {
    it('should reject if user is not found', async () => {
      const email = 'test@test.com';
      const password = 'password';

      mockUserDatabase.findUserByEmail = jest.fn().mockReturnValue(undefined);

      await expect(userManagement.login(email, password)).rejects.toThrow('User not found');
    });

    it('should reject if password is incorrect', async () => {
      const email = 'test@test.com';
      const password = 'password';
      const mockUser = { id: 1, password: 'otherPassword' };

      mockUserDatabase.findUserByEmail = jest.fn().mockReturnValue(mockUser);

      await expect(userManagement.login(email, password)).rejects.toThrow("Password doesn't match");
    });

    it('should create a new section and return the auth token if login is successful', async () => {
      const email = 'test@test.com';
      const password = 'password';
      const mockUser = { id: 1, password: 'password' };

      mockUserDatabase.findUserByEmail = jest.fn().mockReturnValue(mockUser);      

      expect(userManagement.login(email, password)).resolves.toHaveLength(64);
      expect(mockSectionManager.createSection).toBeCalled();
    });
  });

  describe('signUp', () => {
    it('should reject if user already exists', async () => {
      const email = 'test@test.com';
      const name = 'Test User';
      const password = 'password';
      
      mockUserDatabase.userExists = jest.fn().mockReturnValue(true);
      
      await expect(userManagement.signUp(email, name, password)).rejects.toThrow('User already exists!');
    });

    it('should create a new user and return success message', async () => {
      const email = 'test@test.com';
      const name = 'Test User';
      const password = 'password';

      mockUserDatabase.userExists = jest.fn().mockReturnValue(false);
      mockUserDatabase.createUser = jest.fn().mockReturnValue(true);
      
      await expect(userManagement.signUp(email, name, password)).resolves.toBe('User sucessfully created!');
      expect(mockUserDatabase.createUser).toHaveBeenCalledWith(name, email, password);
    });
    it('should reject with internal error when createUser fails', async () => {
        const email = 'test@test.com';
        const name = 'Test User';
        const password = 'password';
    
        mockUserDatabase.createUser = jest.fn().mockReturnValue(false);
        mockUserDatabase.userExists = jest.fn().mockReturnValue(false);
    
        await expect(userManagement.signUp(email, name, password)).rejects.toThrow('Internal Error');
     });
  });
  describe('logoff', () => {
    const authToken = 'fakeAuthToken';
  
    it('should resolve with success message if section is destroyed', async () => {
      mockSectionManager.destroySection = jest.fn().mockReturnValue(true);
  
      const result = await userManagement.logoff(authToken);
  
      expect(result).toEqual('Successfully signed off!');
      expect(mockSectionManager.destroySection).toHaveBeenCalledWith(authToken);
    });
  
    it('should reject with error message if section is not destroyed', async () => {
      mockSectionManager.destroySection = jest.fn().mockReturnValue(false);
  
      await expect(userManagement.logoff(authToken)).rejects.toThrow('Already logged off, refresh the page.');
      expect(mockSectionManager.destroySection).toHaveBeenCalledWith(authToken);
    });
  });
  describe('getUserData', () => {
    it('should reject if not logged in', async () => {
      const authToken = 'invalid-token';
      mockSectionManager.getUserID = jest.fn().mockReturnValue(-1);
  
      await expect(userManagement.getUserData(authToken)).rejects.toThrow('Log in in order to get data!');
    });
  
    it('should return user data without sensitive fields', async () => {
      const authToken = 'valid-token';
      const userId = 1;
      const user = { id: userId, name: 'Test User', email: 'test@test.com', password: 'password' };
      const userData = '{"name":"Test User","email":"test@test.com"}';
      mockSectionManager.getUserID = jest.fn().mockReturnValue(userId);
      mockUserDatabase.findUserById = jest.fn().mockReturnValue(user);
  
      await expect(userManagement.getUserData(authToken)).resolves.toBe(userData);
    });
  });
});