import axios from "axios";
import { useEffect } from "react";
import useTools from "../../utils/useTools";
import { baseURL } from "../../utils/misc";

export default function GrowrSubscribed() {
  const id = window.document.URL.split("/").pop();
  const { goToPage } = useTools();
  useEffect(() => {
    const subscribed = {
      isSubscribed: true,
    };
    axios
      .put(`${baseURL}/user/${id}`, subscribed)
      .then(() => {
        goToPage("/dashboard");
      })
      .catch((error) => console.error(error));
  });
  return <></>;
}
