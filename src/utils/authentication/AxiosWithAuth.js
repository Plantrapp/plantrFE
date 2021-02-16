import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://anytime-fitness.herokuapp.com", // Change to BE url
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
