const getUsers = async (id) => {

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if(!response.ok) {
      throw new Error('Network response was not ok');
    }

    const  data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export { getUsers };