import axios from "axios";
import { useHistory } from "react-router-dom";
import { baseURL } from "./misc";
export default function useTools() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const goToPage = (page, data = {}) => {
    // console.log("from tools", data);
    history.push(page, data);
  };

  const getHistoryState = () => {
    // console.log(history.location);
    return history.location.state;
  };

  const getStars = (user_id, setter) => {
    axios
      .get(`${baseURL}/reviews/${user_id}`)
      .then((response) => {
        return setter(response.data.average);
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
