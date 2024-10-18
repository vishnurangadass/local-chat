import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Signin.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Please enter the same password");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/profile?email=${email}`
      );
      if (response.data.length > 0) {
        setError("Username already exists");
        return;
      }
      const allProfiles = await axios.get("http://localhost:8000/profile");
      const profiles = allProfiles.data;

      const highestId =
        profiles.length > 0
          ? Math.max(...profiles.map((profile) => profile.id))
          : 0;
      const newId = highestId + 1;
      const newUser = {
        id: newId,
        email: email,
        fullname: fullname,
        mobile: mobile,
        password: password,
      }
  
      await axios.post("http://localhost:8000/profile", newUser);
      setSuccess("User registered successfully!");
    } catch (error) {
      setError("An error occurred while signing up");
    }
  };
  return (
    <div className="loginForm">
      <form className="formData" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <input
          className="textbox"
          type="text"
          placeholder="Fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          autoFocus
        />
        <input
          className="textbox"
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          className="textbox"
          type="email"
          placeholder="Email Id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="textbox"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="textbox"
          type="password"
          placeholder="Confirm  Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "Green" }}>{success}</p>}
        <button className="submitButton" type="submit">
          Submit
        </button>
        <p style={{ color: "white" }}>
          Already have a account? <Link to="/signin">click here</Link> to Login
        </p>
      </form>
    </div>
  );
};

export default Signup;
