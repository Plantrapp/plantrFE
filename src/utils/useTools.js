import axios from "axios";
import { useHistory } from "react-router-dom";
import { baseURL } from "./misc";
export default function useTools() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const goToPage = (page, data = {}) => {
    console.log("from tools", data);
    history.push(page, data);
  };

  const getHistoryState = () => {
    console.log(history.location);
    return history.location.state;
  };

  const getStars = (user) => {
    let res;
    axios
      .get(`${baseURL}/reviews/${user}`)
      .then((response) => {
        console.log(response.data.average);
        res = response.data.average;
        return res;
      })
      .catch((err) => console.log(err));
  };
  return {
    goBack,
    goToPage,
    getHistoryState,
    getStars,
  };
}
