import UserDatabase, { IUserDatabase } from "../Databases/UserDatabase";
import User from "../Entities/user";

describe("User Database", () => {
  let userDb: IUserDatabase;

  beforeEach(() => {
    userDb = new UserDatabase();
  });

  it("should create a new user", () => {
    userDb.createUser("Alice", "alice@example.com", "password");
    let testUser = new User(0, "Alice", "alice@example.com", "password")
    expect(userDb.userList[0]).toEqual(testUser);
  });

  it("should not create a new user if email already exists", () => {
    userDb.userList.push(new User(1, "Alice", "alice@example.com", "password"));

    expect(userDb.createUser("Bob", "alice@example.com", "password")).toBe(false);
    expect(userDb.userList.length).toEqual(1);
  });

  it("should find a user by email", () => {
    const alice = new User(1, "Alice", "alice@example.com", "password");
    userDb.userList.push(alice);

    expect(userDb.findUserByEmail("alice@example.com")).toEqual(alice);
    expect(userDb.findUserByEmail("bob@example.com")).toBeUndefined();
  });

  it("should find a user by ID", () => {
    const alice = new User(1, "Alice", "alice@example.com", "password");
    userDb.userList.push(alice);

    expect(userDb.findUserById(1)).toEqual(alice);
    expect(userDb.findUserById(2)).toBeUndefined();
  });

  it("should destroy a user by ID", () => {
    const alice = new User(1, "Alice", "alice@example.com", "password");
    const bob = new User(2, "Bob", "bob@example.com", "password");

    userDb.userList.push(alice, bob);

    expect(userDb.destroyUser(2)).toBe(true);
    expect(userDb.userList.length).toEqual(1);
    expect(userDb.findUserById(2)).toBeUndefined();
  });

  it("should not destroy a user if ID does not exist", () => {
    const alice = new User(1, "Alice", "alice@example.com", "password");

    userDb.userList.push(alice);

    expect(userDb.destroyUser(2)).toBe(false);
    expect(userDb.userList.length).toEqual(1);
  });
});