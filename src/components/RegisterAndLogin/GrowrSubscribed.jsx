import axios from "axios";
import { useEffect } from "react";
import useTools from "../../utils/useTools";
import { baseURL } from "../../utils/misc";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

export default function GrowrSubscribed() {
  const id = window.document.URL.split("/").pop();
  const { goToPage } = useTools();
  useEffect(() => {
    const subscribed = {
      isSubscribed: true,
    };
    axiosWithAuth()
      .put(`/user/${id}`, subscribed)
      .then(() => {
        console.log("success!");
        goToPage("/dashboard");
      })
      .catch((error) => console.error(error));
  });
  return <></>;
}
