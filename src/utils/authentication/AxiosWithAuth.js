import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    // baseURL: "https://obscure-beyond-36960.herokuapp.com",
    baseURL: `http://localhost:5000`,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
