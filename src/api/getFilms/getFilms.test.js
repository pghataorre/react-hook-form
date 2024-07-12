import { getFilms } from './getFilms';
import { result } from '../../mockData/mockData';

const mockFetch = jest.fn();

global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockImplementation(() =>  
    Promise.resolve({
      json: () => Promise.resolve(result),  
    })
  );

  mockFetch.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('getFilms', () => {
  it('should call an API and return an Array of films', async () => {
    await getFilms()
    expect(result).toEqual(result);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:3000/mockFilms.JSON", {"headers": {"Accept": "application/json", "Content-Type": "application/json", "accept": "application/json"}});
  });
});