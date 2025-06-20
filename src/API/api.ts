import axios from "axios";
import { UnsplashResponse } from "../types/types";

const ACCESS_KEY = import.meta.env.VITE_API_KEY;

axios.defaults.baseURL = "https://api.unsplash.com/";

export const FetchImages = async (
  searchRequest: string,
  currentPage: number
): Promise<UnsplashResponse> => {
  const responce = await axios.get("/search/photos", {
    params: {
      orientation: "landscape",
      query: searchRequest,
      page: currentPage,
      per_page: 12,
    },
    headers:{
    Authorization: `Client-ID ${ACCESS_KEY}`
  },
  });
  return responce.data;
};
