import { addRandomNumbers } from './generateMultipleUUID';
import generateOneRandomNumber from './generateOneRandomNumber';

jest.mock('./generateOneRandomNumber');

describe('addRandomNumbers()', () => {
  it('should add two random numbers and be 100', () => {
    generateOneRandomNumber
      .mockImplementationOnce(() => 50)
      .mockImplementationOnce(() => 50);

      const result = addRandomNumbers();
      expect(result).toBe(100)
  });
});
