import React, { useState, useEffect } from "react";
import axios from "axios";

// Functional component for the form
export default function Form() {
  // State variables for user data, errors, success flag, and form submission flag
  const [user, setUser] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    fee: "",
    slot: "",
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [submit, isSubmit] = useState(false);

  // Function to handle input changes in the form
  function handleChange(e) {
    const { name, value } = e.target;

    // Updating user state using the previous state
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  // Function to handle form submission
  function submitUser(e) {
    e.preventDefault();
    setError(validate(user));
    isSubmit(true);
  }

  // useEffect hook to make an API request when there are no validation errors
  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      // Assuming an API endpoint for enrollment and payment
      axios
        .post("https://yogaformbackend.onrender.com/", user)
        .then((res) => {
          console.log(res.data);
          setSuccess(true);
        })
        .catch((error) => {
          console.error("Enrollment failed:", error);
        });

      // Resetting the user state after submission
      setUser({
        name: "",
        age: "",
        gender: "",
        contact: "",
        fee: "",
        slot: "",
      });
    }
  }, [error]);

  // Validation function to check form field values
  const validate = (values) => {
    const errors = {};
    if (!user.name) {
      errors.name = "Name is required!";
    }
    if (!user.age) {
      errors.age = "Age is required!";
    } else if (parseInt(user.age) < 18 || parseInt(user.age) > 65) {
      errors.age = "Age must be between 18 and 65 years!";
    }
    if (!user.gender) {
      errors.gender = "Gender is required!";
    }
    if (!user.contact) {
      errors.contact = "Contact is required!";
    } else if (
      parseInt(user.contact) < 1000000000 ||
      parseInt(user.contact) > 9999999999 ||
      user.contact < "1000000000" ||
      user.contact > "9999999999"
    ) {
      errors.contact = "Contact must be equal to 10 digits!";
    }
    if (!user.fee) {
      errors.fee = "Fees is required!";
    } else if (parseInt(user.fee) !== 500) {
      errors.fee = "Fees must be equal to 500!";
    }
    if (!user.slot) {
      errors.slot = "Select a slot!";
    }
    return errors;
  };

  // JSX for the form UI
  return (
    <div className="box">
      <form autoComplete="off">
        <div className="heading">
          <h1>{success ? "Payment Successful" : "Batch Registration"}</h1>
        </div>
        <div className="sign">
          <h3>{success ? "" : "Sign Up"}</h3>
        </div>
        {success ? (
          <div>
            <button onClick={() => setSuccess(false)}>
              Go Back to Admission Form
            </button>
          </div>
        ) : (
          <div className="name">
            <label>
              Name:<span className="Req">*</span>{" "}
            </label>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={user.name}
              onChange={handleChange}
            ></input>
          </div>
        )}
        {!success && <p>{error.name}</p>}
        {!success && (
          <div className="age">
            <label>
              Age:<span className="Req">*</span>{" "}
            </label>
            <input
              type="Number"
              placeholder="Your Age"
              name="age"
              value={user.age}
              onChange={handleChange}
            ></input>
          </div>
        )}
        {!success && <p>{error.age}</p>}
        {!success && (
          <div className="gender">
            <label>
              Gender:<span className="Req">*</span>{" "}
            </label>
            <input
              type="text"
              placeholder="Your Gender"
              name="gender"
              value={user.gender}
              onChange={handleChange}
            ></input>
          </div>
        )}
        {!success && <p>{error.gender}</p>}
        {!success && (
          <div className="contact">
            <label>
              Contact:<span className="Req">*</span>{" "}
            </label>
            <input
              type="number"
              placeholder="Your Contact Number"
              name="contact"
              value={user.contact}
              onChange={handleChange}
            ></input>
          </div>
        )}
        {!success && <p>{error.contact}</p>}
        {!success && (
          <div className="fee">
            <label>
              Fee:<span className="Req">*</span>{" "}
            </label>
            <input
              type="number"
              placeholder="Enter Amount"
              name="fee"
              value={user.fee}
              onChange={handleChange}
            ></input>
          </div>
        )}
        {!success && <p>{error.fee}</p>}
        {!success && (
          <div className="slot">
            <label>
              Slot:<span className="Req">*</span>{" "}
            </label>
            <select name="slot" value={user.slot} onChange={handleChange}>
              <option className="option1">Choose Your Timing</option>
              <option>6-7 AM</option>
              <option>7-8 AM</option>
              <option>8-9 AM</option>
              <option>5-6 PM</option>
            </select>
          </div>
        )}
        {!success && <p>{error.slot}</p>}
        {!success && (
          <div className="btn">
            <button type="submit" onClick={submitUser}>
              Proceed to Payment<i class="fa-solid fa-indian-rupee-sign"></i>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
