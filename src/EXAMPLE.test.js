
const mockFetch = jest.fn();



describe('EXAMPLE OF HOW TO SEE IF A JEST.FN IS REALLY WORKING', () => {
  beforeEach(() => {

    console.log('------------------------- global fetch before mock -------------------------', global.fetch.toString())
    // SHOULD RETURN THE FETCH FUNCTION CODE

    global.fetch = mockFetch;
    //  NOW FETCH IS MOCKED

    console.log('------------------------- global fetch before mock -------------------------', global.fetch.toString())
    // SHOULD RETURN THE MOCKED FUNCTION - WE KNOW NOW MOCK FETCH IS WORKING
    // SHOULD LOOK THIS AN EMPTY FUNCTION. 
    // function () {
    //   return fn.apply(this, arguments);
    // }


    console.log('------------------------- THE ACTUAL JEST.FN() --- mockFetch -- HAS METHODS -------------------------', mockFetch)  

    // {
    //   _isMockFunction: true,
    //   getMockImplementation: [Function (anonymous)],
    //   mock: [Getter/Setter],
    //   mockClear: [Function (anonymous)],
    //   mockReset: [Function (anonymous)],
    //   mockRestore: [Function (anonymous)],
    //   mockReturnValueOnce: [Function (anonymous)],
    //   mockResolvedValueOnce: [Function (anonymous)],
    //   mockRejectedValueOnce: [Function (anonymous)],
    //   mockReturnValue: [Function (anonymous)],
    //   mockResolvedValue: [Function (anonymous)],
    //   mockRejectedValue: [Function (anonymous)],
    //   mockImplementationOnce: [Function (anonymous)],
    //   mockImplementation: [Function (anonymous)],
    //   mockReturnThis: [Function (anonymous)],
    //   mockName: [Function (anonymous)],
    //   getMockName: [Function (anonymous)]
    // }


  })



  // EXAMPLE OF HOW TO USE JEST.FN() AND LOADING IT WITH An OVERRIDE FUNCTION
  //  -------------------------------------------------------------
  const manipulateArray = (array, manipulateMethod) => {
    return array.map((item) => manipulateMethod(item));
  }
  
  test("playground", () => {
    const array = [0, 1, 2];
    const someMockTestOverrideFunction = (x) => x + 2 + 'HELLO';


    const mockManipulateMethod = jest.fn(someMockTestOverrideFunction);
    manipulateArray(array, mockManipulateMethod);
  
    console.log(
      "mockManipulateMethod's mock property:", 
      mockManipulateMethod.mock
    );
  });








});