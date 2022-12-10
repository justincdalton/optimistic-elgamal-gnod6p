export const fetchPeople = (params?: any) => {
  const searchParams = new URLSearchParams(params);

  return fetch("http://localhost:3434/people?" + searchParams.toString())
    .then((res) => res.json())
    .then((data) => data);
};
