import React, { useState } from "react";
import "./Login.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';

export default function SignUp({ setauth }) {
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

    event.preventDefault()


    console.log(LoginForm)
    try {

      if(LoginForm.username=='' && LoginForm.password==''){
        return error("Enter Email and Password")
      }

      if(LoginForm.username==''){
        return error("Enter Email")
      }

      if(LoginForm.password==''){
        return error("Enter Password")
      }

      const result = await axios.post("https://notes-website-amber.vercel.app/signup", {
        username: LoginForm.username,
        password: LoginForm.password,
      });

      console.log(result.data.message)

      if(result.status == 200){
        setauth(true)
        navigate('https://notes-website-amber.vercel.app/Notes')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main">
      <h1>Sign Up</h1>
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

        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <Toaster />
      </form>
    </div>
  );
}
