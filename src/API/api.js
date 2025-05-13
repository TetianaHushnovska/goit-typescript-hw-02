import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const FetchImages = async (searchRequest, currentPage) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiInstans = await axios.get("/search/photos", {
    params: {
      query: searchRequest,
      page: currentPage,
      per_page: 12,
    },
    headers:{
    Authorization: `Client-ID ${apiKey}`
  },
  });
  return apiInstans;
};
