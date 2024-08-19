import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { API_ENDPOINT } from "../utils/api-endpoints";

//untuk hit API
const fetchDataMoviePopular = async ({ queryKey }) => {
  //untuk handle api
  //v3
  // const { data } = await http.get(`${API_ENDPOINT.NOW_PLAYING}?page=${page ? page : 1}`);

  //v4
  const [_key, _params] = queryKey;
  const { data } = await http.get(_key, { params: _params });
  // console.log(queryKey, "querykey");
  return data;
};

//untuk Dinamis handle
const useMovieDataPopular = (options) => {
  //v3
  // return useQuery(["userData", page], () => fetchDataMovie(page));

  //v4
  return useQuery([API_ENDPOINT.POPULAR, options], fetchDataMoviePopular);
};

export { fetchDataMoviePopular, useMovieDataPopular };
