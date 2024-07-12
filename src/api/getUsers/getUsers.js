const getUsers = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export { getUsers };