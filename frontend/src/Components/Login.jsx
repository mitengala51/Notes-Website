import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [LoginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const navigate = useNavigate()

  function handleUsername(e){
    setLoginForm({
      ...LoginForm,
      username: e.target.value
    })
  }

  function handlePassword(e){
    setLoginForm({
      ...LoginForm,
      password: e.target.value
    })
  }

  async function handleSubmit(event) {

    event.preventDefault()

    console.log(LoginForm)
    try {
      const result = await axios.post("http://localhost:3000/login", {
        username: LoginForm.username,
        Inputpassword: LoginForm.password,
      });

      console.log(result.data.message)
      
      if(result.status == 200){
        navigate('/Notes')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='main'>
        <h1>Login</h1>
        <form className='Login' onSubmit={handleSubmit}>
            <span>Email</span>
            <input type='email' placeholder='Enter your email' onChange={handleUsername}></input>
            <span>Password</span>
            <input type='password' placeholder='Enter your password' onChange={handlePassword}></input>
            <button type='submit'>Submit</button>

            <p>Dont have an account? <a href=''>Sign up</a></p>
        </form>
    </div>
  )
}
