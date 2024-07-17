import {mockOrderedFilms, result} from '../../mockData/mockData'
import { orderFilmData, randomGenerateBetween, generateUUID, getTodaysDate} from './apiHelpers';

// Random functions that include JS functions that need to be mocked
// An exercise to show how to mock FUNCTIONS in Jest using jest.fn();



describe('orderFilmData', () => {
  it('should return the film data in a sorted array', () => {
    const mockUnorderdFilmData = result.data.splice(0, 15);
    expect(orderFilmData(mockUnorderdFilmData)).toStrictEqual(mockOrderedFilms);
  });
})

describe('randomGenerateBetween', () => {
  it('should return a random number between a range', () => {
    const mockRandom = jest.fn().mockReturnValue(0.5);
    global.Math.random = mockRandom;
    const result = randomGenerateBetween(1, 10);
    expect(result).toBe(6);
  });
})

describe('generateUUID', () => {
  const mockUUID = '730d17e7-dfe3-431e-b4ee-8470f478108c';

  it('should return a UUID', () => {
    const mockRandom = jest.fn().mockReturnValue(mockUUID);
    Object.defineProperty(global, 'crypto', {
      value: {randomUUID: mockRandom}
    });

    const test = generateUUID();
    expect(test).toBe(mockUUID);
  });
})

describe('getTodaysDate', () => {
  it('should return a date', () => {
    const mockTodaysDate = new Date();
    const mockDate = jest.fn().mockReturnValue(mockTodaysDate);
    global.Date = mockDate;
    
    const dateResult = getTodaysDate();

    expect(dateResult).toBe(mockTodaysDate);
  });
})