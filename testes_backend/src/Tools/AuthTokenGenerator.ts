import crypto from 'crypto';

const generateAuthToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
}
export default generateAuthToken