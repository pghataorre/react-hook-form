import { returnMultipleRandomNumbers } from './generateMultipleUUID';

const mockRandomGenerateBetween = jest.fn();

jest.mock('./apiHelpers', () => ({
  randomGenerateBetween: () => mockRandomGenerateBetween(),
}));

describe('generateUUIDs()', () => {
  beforeEach(() => {
    mockRandomGenerateBetween.mockReturnValue(3);
  })

  it('should return an array of random numbers', () => {
    expect(returnMultipleRandomNumbers(4)).toHaveLength(4);
  });

  it('should NOT return an array of random numbers if a negative count is passed in', () => {
    expect(returnMultipleRandomNumbers(-2)).toHaveLength(0);
  });
  
  it('should all 3s', () => {
    expect(returnMultipleRandomNumbers(5)).toStrictEqual([3,3,3,3,3]);
  });

  it('should return numbers in array between 1 and 1000', () => {
    mockRandomGenerateBetween
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4)

    // GOTCHA ------ above .mockReturnValueOnce mocks 4 calls
    // The test calls to generate 5 random number
    // The 5th number is the number given back to us from the beforeEach mock.
    expect(returnMultipleRandomNumbers(5)).toStrictEqual([1,2,3,4,3]);
  }); 
  
});
