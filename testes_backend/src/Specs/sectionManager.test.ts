import SectionManager from '../useCases/sectionManager';

describe('SectionManager', () => {
  let sectionManager: SectionManager;
  
  beforeEach(() => {
    sectionManager = new SectionManager();
  });
  
  describe('Section Creation', () => {
    it('should add a new section if authToken and userID are unique', () => {
      const result = sectionManager.createSection('token1', 1);

      expect(result).toBe(true);
      expect(sectionManager.activeSections.length).toEqual(1);
      expect(sectionManager.activeSections[0].authToken).toBe('token1');
      expect(sectionManager.activeSections[0].userID).toBe(1);
    });

    it('should return false if authToken or userID already exist', () => {
      sectionManager.createSection('token1', 1);
      const result1 = sectionManager.createSection('token1', 2);//equal token
      const result2 = sectionManager.createSection('token2', 1);//equal id

      expect(result1).toBe(false);
      expect(result2).toBe(false);
      expect(sectionManager.activeSections.length).toEqual(1);
    });
  });

  describe('Getting User', () => {
    it('should return the userID of the section with the given authToken', () => {
      sectionManager.createSection('token1', 1);
      const result = sectionManager.getUser('token1');

      expect(result).toBe(1);
    });

    it('should return -1 if authToken does not exist', () => {
      const result = sectionManager.getUser('token1');

      expect(result).toBe(-1);
    });
  });

  describe('Destroying section', () => {
    it('should remove the section with the given authToken', () => {
      sectionManager.createSection('token1', 1);
      const result = sectionManager.destroySection('token1');

      expect(result).toBe(true);
      expect(sectionManager.activeSections.length).toEqual(0);
    });

    it('should return false if authToken does not exist', () => {
      const result = sectionManager.destroySection('token1');

      expect(result).toBe(false);
      expect(sectionManager.activeSections.length).toEqual(0);
    });
  });
});