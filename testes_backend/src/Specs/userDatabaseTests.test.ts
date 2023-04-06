import UserDatabase, { IUserDatabase } from "../Databases/UserDatabase";
import User from "../Entities/user";
import * as fs from 'fs';

describe("UserDatabase", () => {
  const testFile = "data/userTests.json";
  let userDB: UserDatabase;

  describe('Load UserList', () => {
    afterEach(()=>{
      fs.truncate(testFile, 0,()=>{});
    })
    it('should set the fileName property to "users" by default', () => {
      const userDatabase = new UserDatabase();
      expect(userDatabase.fileName).toBe('users');
    });
    
    it('should set filename',()=>{
      userDB = new UserDatabase("filename");
      expect(userDB.fileName).toEqual("filename");
    })

    it('loads user data from file', () => {
      const data = [
        new User(1, 'Alice', 'alice@example.com', 'password1'),
        new User(2, 'Bob', 'bob@example.com', 'password2'),  
        new User(3, 'Charlie', 'charlie@example.com', 'password3')      
      ];
      fs.writeFileSync(testFile,JSON.stringify(data));
      userDB = new UserDatabase("userTests");
      expect(userDB.userList).toEqual(data);
    })

    it('handles empty file', () => {
      fs.writeFileSync(testFile, '');      
      userDB = new UserDatabase("userTests");
      const data = fs.readFileSync(testFile);
      expect(userDB.userList).toEqual([]);
    });

    it('handles invalid JSON', () => {
      fs.writeFileSync(testFile, 'not json');      
      userDB = new UserDatabase("userTests");
      expect(userDB.userList).toEqual([]);
    });

    it("should handle error and set userList to empty array", () => {
      userDB = new UserDatabase("");
      expect(userDB.userList).toEqual([]);
    })
  });
  describe('Save UserList', () => {
    it('saves user data to file', () => { 
      userDB = new UserDatabase("userTests");      
      let success = userDB.createUser('Alice', 'alice@example.com', 'password');
      expect(success).toBeTruthy()
      expect(userDB.userList).toEqual([new User(0, 'Alice', 'alice@example.com', 'password')]);
      const data = fs.readFileSync(testFile);
      expect(data.toString()).toEqual('[{"id":0,"name":"Alice","email":"alice@example.com","password":"password"}]');
    })
  });
  describe('Database Management',()=>{
    beforeEach(()=>{
      fs.truncate(testFile, 0,()=>{});
      userDB = new UserDatabase("userTests");
      userDB.userList = [];
    })
    it("should create a new user", () => {
      userDB.createUser("Alice", "alice@example.com", "password");
      let testUser = new User(0, "Alice", "alice@example.com", "password")
      expect(userDB.userList[0]).toEqual(testUser);
    });
  
    it("should create a new user with the correct id", () => {
      userDB.createUser("Alice", "alice@example.com", "password");
      userDB.createUser("Bob", "bob@example.com", "password");
    
      let testUser = new User(1, "Bob", "bob@example.com", "password");
      expect(userDB.userList[1]).toEqual(testUser);
    });
  
    it("should not create a new user if email already exists", () => {
      userDB.createUser("Alice", "alice@example.com", "password")
      expect(userDB.createUser("Bob", "alice@example.com", "password")).toBe(false);
      expect(userDB.userList.length).toEqual(1);
    });
  
    it("should find a user by email", () => {
      const alice = new User(1, "Alice", "alice@example.com", "password");
      userDB.userList.push(alice);
  
      expect(userDB.findUserByEmail("alice@example.com")).toEqual(alice);
      expect(userDB.findUserByEmail("bob@example.com")).toBeUndefined();
    });
  
    it("should find a user by ID", () => {
      const alice = new User(1, "Alice", "alice@example.com", "password");
      userDB.userList.push(alice);
  
      expect(userDB.findUserById(1)).toEqual(alice);
      expect(userDB.findUserById(2)).toBeUndefined();
    });
  
    it("should destroy a user by ID", () => {
      const alice = new User(1, "Alice", "alice@example.com", "password");
      const bob = new User(2, "Bob", "bob@example.com", "password");
  
      userDB.userList.push(alice, bob);
  
      expect(userDB.destroyUser(2)).toBe(true);
      expect(userDB.userList.length).toEqual(1);
      expect(userDB.findUserById(2)).toBeUndefined();
    });
  
    it("should not destroy a user if ID does not exist", () => {
      const alice = new User(1, "Alice", "alice@example.com", "password");
  
      userDB.userList.push(alice);
  
      expect(userDB.destroyUser(2)).toBe(false);
      expect(userDB.userList.length).toEqual(1);
    });
  })  
});