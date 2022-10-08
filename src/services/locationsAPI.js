export const getLocations = async () => {
  const request = await fetch("https://ghibliapi.herokuapp.com/locations");
  const requestJson = await request.json();
  return requestJson;
};
