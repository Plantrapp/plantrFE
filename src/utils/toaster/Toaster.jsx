import React, { useContext } from "react";
import Toast from "react-bootstrap/Toast";
import { CurrentUserContext } from "../contexts/Contexts";

export default function Toaster() {
  const { showToast, setShowToast } = useContext(CurrentUserContext);

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
        <Toast.Header
          style={{ background: "rgb(190, 60, 60)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="error-toast-body">
          Your username or password was incorrect
        </Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("invalidUpdatePassword")}
        show={showToast.invalidUpdatePassword}
        delay={5000}
        autohide
      >
        <Toast.Header
          style={{ background: "rgb(190, 60, 60)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="error-toast-body">
          Previous password was incorrect
        </Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("successfulProfileUpdate")}
        show={showToast.successfulProfileUpdate}
        delay={5000}
        autohide
      >
        <Toast.Header
          style={{ background: "rgb(140, 210, 120)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="success-toast-body">
          Profile was successfully updated
        </Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("successfulUpdatePassword")}
        show={showToast.successfulUpdatePassword}
        delay={5000}
        autohide
      >
        <Toast.Header
          style={{ background: "rgb(140, 210, 120)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="success-toast-body">
          Password was successfully updated
        </Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("successfulNewPost")}
        show={showToast.successfulNewPost}
        delay={5000}
        autohide
      >
        <Toast.Header
          style={{ background: "rgb(140, 210, 120)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="success-toast-body">
          The new post was successfully created
        </Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("invalidNewPost")}
        show={showToast.invalidNewPost}
        delay={5000}
        autohide
      >
        <Toast.Header
          style={{ background: "rgb(140, 210, 120)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="error-toast-body">
          error with sending the new post
        </Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("successfulUpdatePost")}
        show={showToast.successfulUpdatePost}
        delay={5000}
        autohide
      >
        <Toast.Header
          style={{ background: "rgb(140, 210, 120)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="success-toast-body">
          Your post was successfully updated
        </Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("successfulDeletePost")}
        show={showToast.successfulDeletePost}
        delay={5000}
        autohide
      >
        <Toast.Header
          style={{ background: "rgb(140, 210, 120)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="success-toast-body">Post was Deleted</Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("forgotPasswordSent")}
        show={showToast.forgotPasswordSent}
        delay={5000}
        autohide
      >
        <Toast.Header
          style={{ background: "rgb(140, 210, 120)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="success-toast-body">
          Forgot Password was sent to the requested email
        </Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("forgotPasswordAlreadySent")}
        show={showToast.forgotPasswordAlreadySent}
        delay={8000}
        autohide
      >
        <Toast.Header
          style={{ background: "rgb(190, 60, 60)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="error-toast-body">
          <p>
            Forgot Password was already sent.
            <br />
            Please check your email.
          </p>
        </Toast.Body>
      </Toast>

      <Toast
        onClose={() => toastOff("successfulReviewSubmitted")}
        show={showToast.successfulReviewSubmitted}
        delay={5000}
        autohide
      >
        <Toast.Header
          style={{ background: "rgb(140, 210, 120)", color: "whitesmoke" }}
        >
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="success-toast-body">
          Review was successfully submitted
        </Toast.Body>
      </Toast>
    </>
  );
}
