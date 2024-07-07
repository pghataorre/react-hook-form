import { mockData }  from './mockData';
import {orderFilmData} from './apiHelpers';

const getUsers = async (id) => {

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    if(!response.ok) {
      throw new Error('Network response was not ok');
    }

    await response.json();
    const orderedData = orderFilmData(mockData);

    return orderedData;
  } catch (error) {
    throw new Error(error);
  }
}

export { getUsers };