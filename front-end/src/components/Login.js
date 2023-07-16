import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const naviagte = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      naviagte("/");
    }
  });

  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:6001/login", 
     {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // pehle hm result.name match kr rhe the but ab hnm log auth token ko metch krayenge
    // if (result.name) {
    if (result.auth) {
      // user set krne ke liye localstorage me 
      localStorage.setItem("user", JSON.stringify(result.user));
      // or token bhi set krna pdega
      localStorage.setItem("token", JSON.stringify(result.auth));
      naviagte("/");
      alert("user successfully login")
    } else {
      alert(result);
    }
  };

  return (
    <div>
      <div className="box">
        <h1>LogIn</h1>
        <input
          className="inputstyle"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputstyle"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button className="button" type="submit" onClick={handleLogin}>
          {" "}
          LogIn
        </button>
      </div>
    </div>
  );
};

export default Login;
