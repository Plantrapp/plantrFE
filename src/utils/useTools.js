import axios from "axios";
import { useHistory } from "react-router-dom";
import { baseURL } from "./misc";
export default function useTools() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const goToPage = (page, data = {}) => {
    history.push(page, data);
  };

  const getHistoryState = () => {
    return history.location.state;
  };

  const getStars = async (user) => {
    let res;
    await axios
      .get(`${baseURL}/reviews/${user}`)
      .then((response) => {
        console.log(response.data.average);
        res = response.data.average;
      })
      .catch((err) => console.log(err));
    return res;
  };
  return {
    goBack,
    goToPage,
    getHistoryState,
    getStars,
  };
}
