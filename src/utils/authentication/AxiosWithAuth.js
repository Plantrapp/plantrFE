import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://obscure-beyond-36960.herokuapp.com", // Change to BE url
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
