export const getPeople = async () => {
  const request = await fetch("https://ghibliapi.herokuapp.com/people");
  const requestJson = await request.json();
  return requestJson.results;
};


export const getPeopleById = async (id) => {
  const request = await fetch(`https://ghibliapi.herokuapp.com/people/${id}`);
  const requestJson = await request.json();
  return requestJson.results;
};
