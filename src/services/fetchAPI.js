export const fetchAPI = async (data) => {
  const request = await fetch(`https://ghibliapi.herokuapp.com/${data}`);
  const requestJson = await request.json();
  return requestJson;
};
