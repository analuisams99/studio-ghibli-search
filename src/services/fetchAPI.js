export const fetchAPI = async (data) => {
  const request = await fetch(`https://ghibliapi.vercel.app/${data}`);
  const requestJson = await request.json();
  return requestJson;
};
