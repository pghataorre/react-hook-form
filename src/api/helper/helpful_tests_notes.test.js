// Jest.spyOn() - Allows to watch a function or a method.
// Informs of parameters passed to the function. 
// Informs of the number of times it was called.
// Informs of the value returned by the function OR Object Method.


// Jest.fn() - Creates a mock FUNCTION ONLY
// jest.mock() - Overrides the function and returns more details about it.



test("MOCKING A FUNCTION ------------ AND WHAT IT DOES UNDER THE HOOD", () => {
  // jest.fn() - Creates a mock FUNCTION ONLY
  // DO NOT CONFUSE IT WITH jest.mock() - Which mocks the entire module.
  



  const mockFunction = jest.fn();
  console.log("mockFunction:", mockFunction);

  expect('DUMMY TEST').toBe('DUMMY TEST');
});


// When a function is mocked successfully it returns what we see below from the console.log added.
// If you don't get these results then the function was NOT mocked successfully.
// You can see the output as methods to use with jest.fn() e.g.
// jest.fn().mockReturnValue(),
// jest.fn().mockReturnValueOnce(), 
// jest.fn().mockResolvedValue()
// jest.fn().mockImplementationOnce(() => 'Hello World');


/* OUTPUT OF CONSOLE.LOG 
-------------------------------------------------
  mockFunction: [Function: mockConstructor] {
    _isMockFunction: true,
    getMockImplementation: [Function (anonymous)],
    mock: [Getter/Setter],
    mockClear: [Function (anonymous)],
    mockReset: [Function (anonymous)],
    mockRestore: [Function (anonymous)],
    mockReturnValueOnce: [Function (anonymous)],
    mockResolvedValueOnce: [Function (anonymous)],
    mockRejectedValueOnce: [Function (anonymous)],
    mockReturnValue: [Function (anonymous)],
    mockResolvedValue: [Function (anonymous)],
    mockRejectedValue: [Function (anonymous)],
    mockImplementationOnce: [Function (anonymous)],
    withImplementation: [Function: bound withImplementation],
    mockImplementation: [Function (anonymous)],
    mockReturnThis: [Function (anonymous)],
    mockName: [Function (anonymous)],
    getMockName: [Function (anonymous)]
  }
-------------------------------------------------  
*/



test("MOCKING A FUNCTION USING mockImplementation()", () => {

  // jest.fn() - Creates a mock FUNCTION ONLY/
  // Have setup a mock FUNCTION that returns 2 + 4

  const mockFetch = jest.fn().mockImplementation(() => 2 + 4);

  console.log("mockFetch:", mockFetch);

  // fetch is a global function in the browser, that fetches resources from the server.
  // Have implemented a mock fetch function that returns with the .mockImplementation() method.
  // .mockImplementation() Really says it will override the real use of function an run the callback function .mockImplementation(() => 2 + 4)
  // It will now run 2 + 4 instead of fetching resources from the server.
  // The result is 6
  // We can use mockImplementation to return a value or run an overriding function.


  global.fetch = mockFetch;
  const test = fetch('http://www.google.com/api/data');

  expect(test).toBe(6);
});


  test("MOCKING A FUNCTION .mockReturnValue() mockReturnValueOnce() ------------", () => {
    const mockFunction = jest
      .fn()
      .mockReturnValue("other calls")
      .mockReturnValueOnce("first call")
      .mockReturnValueOnce("second call");

    for (let index = 0; index < 5; index++) {
      console.log("mockedProduct", mockFunction());
    }

    expect('DUMMY TEST').toBe('DUMMY TEST');

      /* OUTPUT:
    mockedProduct first call
    mockedProduct second call
    mockedProduct other calls
    mockedProduct other calls
    mockedProduct other calls
  */

  });


  // File: getFromLocalStorage.test.js
function getFromLocalStorage(key) {
  return window.localStorage.getItem(key);
}

test("EXAMPLE THAT USES jest.fn().mock()", () => {
  const key = "testKey";
  const value = "testValue";

  const mockLocalStorageGet = jest.fn();

  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: mockLocalStorageGet,
    },
  });


  console.log("mockLocalStorageGet:", mockLocalStorageGet);


  // we want mock value to be returned when mock localstorage is called.
  mockLocalStorageGet.mockReturnValue(value);
  // another usage: window.localStorage.getItem.mockReturnValue(value)

  getFromLocalStorage(key);

  expect(jest.isMockFunction(window.localStorage.getItem)).toBe(true)
  expect(mockLocalStorageGet.mock.lastCall[0]).toBe(key);
  expect(mockLocalStorageGet.mock.results[0].value).toBe(value);


  mockLocalStorageGet.mockReturnValue({'test': '123'});

  const getStorage = getFromLocalStorage('test')
  expect(getStorage).toEqual({"test": "123"});

});

/* OUTPUT:
  PASS  getFromLocalStorage.test.js
    ✓ should get data from local storage correctly (3 ms)
*/


