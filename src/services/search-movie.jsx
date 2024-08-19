// import axios from "axios";
import { API_ENDPOINT } from "../utils/api-endpoints";
import http from "../utils/http";

const baseURL = process.env.REACT_APP_SERVER;
const apikey = process.env.REACT_APP_APIKEY;
const searchURL = API_ENDPOINT.SEARCH_MOVIE;

export const searchMovie = async (q) => {
  const search = await http.get(`${baseURL}${searchURL}?query=${q}&api_key=${apikey}`);
  return search.data;
};
