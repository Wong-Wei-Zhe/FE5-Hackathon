const url = "https://api.jikan.moe/v3";

const API = async (pass_url) => {
  const fetching = await fetch(url + pass_url);

  const data = await fetching.json();

  return data;
};

export default API;
