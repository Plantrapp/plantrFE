import { useEffect } from "react";
import useTools from "../../utils/useTools";
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
        goToPage("/dashboard");
      })
      .catch((error) => console.error(error));
  });
  return <></>;
}
