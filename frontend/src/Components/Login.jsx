import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login({ setauth }) {
  const [LoginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const notify = () => toast.success('Logged in successfully!');
  const error = (message) => toast.error(message);

  function handleUsername(e) {
    setLoginForm({
      ...LoginForm,
      username: e.target.value,
    });
  }

  function handlePassword(e) {
    setLoginForm({
      ...LoginForm,
      password: e.target.value,
    });
  }

  async function handleSubmit(event) {

    console.log(LoginForm);
    try {

      event.preventDefault();

      if(!LoginForm.username || LoginForm.username===''){
        return error("Username is missing")
      }

      if(!LoginForm.password || LoginForm.password===''){
        return error("Password is missing")
      }

      const result = await axios.post("http://localhost:3000/login", {
        username: LoginForm.username,
        Inputpassword: LoginForm.password,
      });

      console.log(result);


      if (result.status == 200) {
        setauth(true)
        notify()
        navigate("/Notes");
      }
    } catch (err) {

      if(err.status == 400){
        error("Password is incorrect")
      }else if(err.status == 405){
        error("Email is incorrect")
      }else{
        error("Something Went Wrong")
      }
    }
  }

  return (
    <div className="main">
      <h1>Login</h1>
      <form className="Login" onSubmit={handleSubmit}>
        <span>Email</span>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={handleUsername}
        ></input>
        <span>Password</span>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={handlePassword}
        ></input>
        <button type="submit">Submit</button>
        <Toaster />

        <p>
          Dont have an account? <a href="/">Sign up</a>
        </p>
      </form>
    </div>
  );
}
