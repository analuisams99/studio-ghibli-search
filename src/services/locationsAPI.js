export const getLocations = async () => {
  const request = await fetch("https://ghibliapi.herokuapp.com/locations");
  const requestJson = await request.json();
  return requestJson.results;
};


export const getLocationById = async (id) => {
  const request = await fetch(`https://ghibliapi.herokuapp.com/locations/${id}`);
  const requestJson = await request.json();
  return requestJson.results;
};
