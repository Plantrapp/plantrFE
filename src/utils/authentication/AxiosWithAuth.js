import axios from "axios";
import { baseURL } from "../misc";
export const axiosWithAuth = () => {
  return axios.create({
    baseURL: `${baseURL}`,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });
};
export const cancelToken = axios.CancelToken.source();
