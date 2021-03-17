import React, { useContext } from "react";
import Toast from "react-bootstrap/Toast";
import { CurrentUserContext } from "../contexts/Contexts";

export default function Toaster() {
  const { showToast, setShowToast } = useContext(CurrentUserContext);
  const messaging = {
    invalidLogin: {
      type: "Error",
      message: "Your username or password was incorrect",
    },
  };

  const toastOff = (tag) => {
    setShowToast({ ...showToast, [tag]: false });
  };

  return (
    <>
      <Toast
        onClose={() => toastOff("invalidLogin")}
        show={showToast.invalidLogin}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{messaging.invalidLogin}</Toast.Body>
      </Toast>
      <Toast
        onClose={() => toastOff("invalidUpdatePassword")}
        show={showToast.invalidUpdatePassword}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Previous password was incorrect</Toast.Body>
      </Toast>
      <Toast
        onClose={() => toastOff("successfulProfileUpdate")}
        show={showToast.successfulProfileUpdate}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Profile was successfully updated</Toast.Body>
      </Toast>
      <Toast
        onClose={() => toastOff("successfulUpdatePassword")}
        show={showToast.successfulUpdatePassword}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Password was successfully updated</Toast.Body>
      </Toast>
      <Toast
        onClose={() => toastOff("successfulNewPost")}
        show={showToast.successfulNewPost}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>The new post was successfully created</Toast.Body>
      </Toast>
      <Toast
        onClose={() => toastOff("invalidNewPost")}
        show={showToast.invalidNewPost}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>error with sending the new post</Toast.Body>
      </Toast>
      <Toast
        onClose={() => toastOff("successfulUpdatePost")}
        show={showToast.successfulUpdatePost}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Your post was successfully updated</Toast.Body>
      </Toast>
      <Toast
        onClose={() => toastOff("successfulDeletePost")}
        show={showToast.successfulDeletePost}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Post was Deleted</Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("forgotPasswordSent")}
        show={showToast.forgotPasswordSent}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Forgot Password was sent to the requested email</Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("successfulReviewSubmitted")}
        show={showToast.successfulReviewSubmitted}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Review was successfully submitted</Toast.Body>
      </Toast>
    </>
  );
}
