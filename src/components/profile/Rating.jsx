import React, { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { submitReviewSchema } from "../../validation/formSchema";
import * as yup from "yup";
import useTools from "../../utils/useTools";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

const StyledRating = Styled.div`
  width: 85vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color:whitesmoke;

  .rating-container{
    width: 80%;
    padding: 2%;
    border-radius:10px;
    background:rgba(255, 255, 255, 0.05);

    .star-rating-container{
      display: flex;
      height: 10vh;
      justify-content: center;
      align-items: center;
      .checked{
        color: yellow;
      }
      .unchecked{
        color: #525151;
      }
    }
    .message-container{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2%;
      flex-wrap: wrap;
      & > textarea{
        width: 90%;
        border: 1px solid whitesmoke;
        border-radius: 3px;
        background: transparent;
        color: whitesmoke ;
      }
    }
    .button {
      text-align: center;
      margin: 1% 0 3% 0;
      display: flex;
      justify-content: center;
      width: 100%;
      .disabled-button{
        width: 20%;
        margin:1%;
        background: transparent;
        color: whitesmoke;
        border: 1px solid rgba(255, 255, 255, 0);
        border-radius: 5px;
        padding: .5%;
        transition: 0.3s ease-in-out;
      }
      .valid-button{
        width: 20%;
        margin:1%;
        background: transparent;
        color: whitesmoke;
        border: 1px solid whitesmoke;
        border-radius: 5px;
        padding: .5%;
        transition: 0.3s ease-in-out;
        border: 1px solid whitesmoke;
        &:hover{
          background: #525151;
        }
      }
    }
  }
  .error{
    color: red;
  }
`;

const initialFormValues = {
  star_rating: "",
  message: "",
};

export default function Rating() {
  const { getHistoryState, goToPage } = useTools();
  const { currentUser, toastOn } = useContext(CurrentUserContext);
  const [growr] = useState(getHistoryState());
  const [disabled, setDisabled] = useState(true);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormValues);
  const [selected, setSelected] = useState([false, false, false, false, false]);
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    yup
      .reach(submitReviewSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    submitReviewSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  const selectStar = (num) => {
    switch (num) {
      case 1:
        setSelected([true, false, false, false, false]);
        setFormValues({
          ...formValues,
          star_rating: 1,
        });
        break;
      case 2:
        setSelected([true, true, false, false, false]);
        setFormValues({
          ...formValues,
          star_rating: 2,
        });
        break;
      case 3:
        setSelected([true, true, true, false, false]);
        setFormValues({
          ...formValues,
          star_rating: 3,
        });
        break;
      case 4:
        setSelected([true, true, true, true, false]);
        setFormValues({
          ...formValues,
          star_rating: 4,
        });
        break;
      case 5:
        setSelected([true, true, true, true, true]);
        setFormValues({
          ...formValues,
          star_rating: 5,
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = () => {
    const back = growr.username;
    const review = {
      ...formValues,
      reviewee_id: growr.id,
      reviewer_id: currentUser.id,
      created_at: new Date().toString(),
    };

    console.log(review);
    axiosWithAuth()
      .post(`/reviews`, review)
      .then((res) => {
        goToPage(`/dashboard/growrProfile/${back}`, growr);
        toastOn("successfulReviewSubmitted");
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledRating>
      <div className="rating-container">
        <h2>Leave a Review</h2>
        <div className="star-rating-container">
          <FaStar
            size={50}
            className={selected[0] ? "checked" : "unchecked"}
            onClick={() => selectStar(1)}
          />
          <FaStar
            size={50}
            className={selected[1] ? "checked" : "unchecked"}
            onClick={() => selectStar(2)}
          />
          <FaStar
            size={50}
            className={selected[2] ? "checked" : "unchecked"}
            onClick={() => selectStar(3)}
          />
          <FaStar
            size={50}
            className={selected[3] ? "checked" : "unchecked"}
            onClick={() => selectStar(4)}
          />
          <FaStar
            size={50}
            className={selected[4] ? "checked" : "unchecked"}
            onClick={() => selectStar(5)}
          />
        </div>
        <p className="error">{formErrors.star_rating}</p>

        <div className="message-container">
          <h3>Message*</h3>

          <textarea name="message" rows="10" onChange={handleOnchange} />
        </div>
        <p className="error">{formErrors.message}</p>

        <div className="button">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`clamped-text ${
              disabled ? "disabled-button" : "valid-button"
            }`}
            disabled={disabled}
          >
            Submit
          </button>
        </div>
      </div>
    </StyledRating>
  );
}
