export const getPeople = async () => {
  const request = await fetch("https://ghibliapi.herokuapp.com/people");
  const requestJson = await request.json();
  return requestJson;
};
