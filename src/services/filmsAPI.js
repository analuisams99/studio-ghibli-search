export const getFilms = async () => {
  const request = await fetch("https://ghibliapi.herokuapp.com/films");
  const requestJson = await request.json();
  return requestJson;
};
