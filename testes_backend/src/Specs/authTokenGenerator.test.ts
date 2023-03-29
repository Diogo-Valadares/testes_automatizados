import generateAuthToken from "../Tools/AuthTokenGenerator";

describe('generateAuthToken', () => {
  it('should return a string', () => {
    expect(typeof generateAuthToken()).toBe('string');
  });

  it('should generate a 64-character hexadecimal string', () => {
    const authToken = generateAuthToken();
    expect(authToken.length).toEqual(64);
    expect(/^[0-9a-fA-F]+$/.test(authToken)).toBe(true);
  });

  it('should generate different tokens for each call', () => {
    const authToken1 = generateAuthToken();
    const authToken2 = generateAuthToken();
    expect(authToken1).not.toEqual(authToken2);
  });
});