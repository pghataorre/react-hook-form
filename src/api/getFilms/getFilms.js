
import {orderFilmData} from '../helper/apiHelpers';

const getFilms = async (id) => {
  try {
    const response = await fetch('http://localhost:3000/mockFilms.JSON', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        accept: 'application/json',
      }
    });
    const result = await response.json();

    const orderedData = orderFilmData(result.data);
    return orderedData;
  } catch (error) {
    throw new Error(error);
  }
}

export { getFilms };