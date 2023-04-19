import { ISectionManager, SectionManager } from '../useCases/sectionManager';
import { expect } from '@jest/globals';

describe('SectionManager', () => {
  let sectionManager: SectionManager;
  
  beforeEach(() => {
    sectionManager = new SectionManager();
  });
  
  describe('Section Creation', () => {
    it('should add a new section if authToken and userID are unique', async () => {
      await expect(sectionManager.createSection('token1', 1)).resolves.toBeUndefined();

      expect(sectionManager.activeSections.length).toEqual(1);
      expect(sectionManager.activeSections[0].authToken).toBe('token1');
      expect(sectionManager.activeSections[0].userID).toBe(1);
    });

    it('should return false if authToken or userID already exist', async () => {
      await sectionManager.createSection('token1', 1);
      await expect(sectionManager.createSection('token1', 2)).rejects.toBe('User already Logged in!');
      await expect(sectionManager.createSection('token2', 1)).rejects.toBe('User already Logged in!');

      expect(sectionManager.activeSections.length).toEqual(1);
    });
  });

  describe('Getting User', () => {
    it('should return the userID of the section with the given authToken', async () => {
      await sectionManager.createSection('token1', 1);
      await expect(sectionManager.getUserID('token1')).resolves.toBe(1);
    });

    it('should return an error if authToken does not exist', async () => {
      await expect(sectionManager.getUserID('token1')).rejects.toBe('Log in in order to get data!');
    });
  });

  describe('Destroying section', () => {
    it('should remove the section with the given authToken', async () => {
      await sectionManager.createSection('token1', 1);
      await expect(sectionManager.destroySection('token1')).resolves.toBe('Successfully signed off!');
      expect(sectionManager.activeSections.length).toEqual(0);
    });

    it('should return an error if authToken does not exist', async () => {
      await expect(sectionManager.destroySection('token1')).rejects.toBe('Already logged off, refresh the page.');
      expect(sectionManager.activeSections.length).toEqual(0);
    });
  });
});