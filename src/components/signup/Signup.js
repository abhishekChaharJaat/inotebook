import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import serverPort from "../../contexts/serverPorts";
import Loader from "../loader/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${serverPort}/api/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.signup) {
      localStorage.setItem("token", json.token);
      navigate("/login");
      window.alert("Signup Successfull");
    }
    setLoading(false);
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {loading && <Loader />}

      {!loading && (
        <div className="signup-box" onSubmit={handelSubmit}>
          <form className="signup-from">
            <h3 className="formheading">Signup</h3>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              onChange={onchange}
              placeholder="Your Name"
            />
            <input
              className="input"
              type="email"
              id="username"
              name="email"
              onChange={onchange}
              placeholder="Email"
            />
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              onChange={onchange}
              placeholder="password"
            />
            <input
              className="input"
              type="password"
              id="confirm_password"
              name="confirm_password"
              onChange={onchange}
              placeholder="confirm password"
            />
            <button type="submit" className="signup-btn">
              Signup
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
