import axios from "axios";
import { useHistory } from "react-router-dom";

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

  const getStars = (user) => {
    axios
      .get(`https://obscure-beyond-36960.herokuapp.com/reviews/${user}`)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };
  return {
    goBack,
    goToPage,
    getHistoryState,
    getStars,
  };
}
