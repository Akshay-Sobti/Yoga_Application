import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";
import backgroundImg from './yoga.jpg'; 

export default function Form() {
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

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function submitUser(e) {
    e.preventDefault();
    setError(validate(user));
    isSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      axios.post("http://localhost:5000/", user).then((res) => console.log(res.data));

      setUser({
        name: "",
        age: "",
        gender: "",
        contact: "",
        fee: "",
        slot: "",
      });
      setSuccess(true);
    }
  }, [error]);

  const validate = (values) => {
    const errors = {};
    if (!user.name) errors.name = "Name is required!";
    if (!user.age) errors.age = "Age is required!";
    else if (parseInt(user.age) < 18 || parseInt(user.age) > 65)
      errors.age = "Age must be between 18 and 65 years!";
    if (!user.gender) errors.gender = "Gender is required!";
    if (!user.contact) errors.contact = "Contact is required!";
    else if (
      parseInt(user.contact) < 1000000000 ||
      parseInt(user.contact) > 9999999999
    ) {
      errors.contact = "Contact must be 10 digits!";
    }
    if (!user.fee) errors.fee = "Fees is required!";
    else if (parseInt(user.fee) !== 500) errors.fee = "Fees must be 500!";
    if (!user.slot) errors.slot = "Select a slot!";
    return errors;
  };

  return (
    <div
      className="form-container"
      style={{
        backgroundImage: `url(${backgroundImg})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div className="box">
        <form autoComplete="off">
          <div className="heading">
            <h1>{success ? "Payment Successful!" : "Admission Form"}</h1>
          </div>

          {!success && (
            <>
              <div className="input-group">
                <label>Name: </label>
                <input type="text" placeholder="Your Name" name="name" value={user.name} onChange={handleChange} />
              </div>
              <p className="error">{error.name}</p>

              <div className="input-group">
                <label>Age: </label>
                <input type="text" placeholder="Your Age" name="age" value={user.age} onChange={handleChange} />
              </div>
              <p className="error">{error.age}</p>

              <div className="input-group">
                <label>Gender: </label>
                <input type="text" placeholder="Your Gender" name="gender" value={user.gender} onChange={handleChange} />
              </div>
              <p className="error">{error.gender}</p>

              <div className="input-group">
                <label>Contact: </label>
                <input type="text" placeholder="Your Contact Number" name="contact" value={user.contact} onChange={handleChange} />
              </div>
              <p className="error">{error.contact}</p>

              <div className="input-group">
                <label>Fee: </label>
                <input type="text" placeholder="Enter Amount" name="fee" value={user.fee} onChange={handleChange} />
              </div>
              <p className="error">{error.fee}</p>

              <div className="input-group">
                <label>Slot: </label>
                <select name="slot" value={user.slot} onChange={handleChange}>
                  <option value="">Pick a slot</option>
                  <option>6-7 AM</option>
                  <option>7-8 AM</option>
                  <option>8-9 AM</option>
                  <option>5-6 PM</option>
                </select>
              </div>
              <p className="error">{error.slot}</p>

              <div className="btn">
                <button type="submit" onClick={submitUser}>
                  Make Payment <span style={{ fontSize: "18px", fontWeight: "bold" }}>₹</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
