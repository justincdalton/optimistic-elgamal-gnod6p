export const fetchPeople = () => {
  // return fetch("https://9087-76-14-115-14.ngrok.io/people")
  //   .then((res) => res.json())
  //   .then((data) => data);

  return Promise.resolve([
    {id: '1', firstName: 'Test', lastName: 'User', age: 30}
  ])
};
