import { getUsers } from './getUsers';

const mockResponseData = 
  [{
    id: 1,
    name: 'Leanne TEST TEST TEST',
    username: 'PERMSTER !!',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {}
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  }];

const mockFetch = jest.fn();
global.fetch = mockFetch

beforeEach(() =>{
  mockFetch.mockImplementationOnce(() => 
    Promise.resolve({
      json: () => Promise.resolve(mockResponseData),
    })
  )

});


afterEach(() => {
  jest.clearAllMocks();
});

describe('getUSers', () => {
  it('calls an API and returns an Array of users', async () => {
    const result = await getUsers();
    expect(mockFetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(result).toEqual(mockResponseData);

  });

  it('calls an API and fail', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        json: () => Promise.reject(new Error('Reject error')),
      })
    )

    try {
      await getUsers();
    } catch(error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toEqual('Reject error');
    }
  });
})
