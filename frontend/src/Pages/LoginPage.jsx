import React from 'react'
import './LoginPage.css'
import Login from '../Components/Login'

function LoginPage({ setauth }) {

  return (
    <div className='LoginPage' >
      <Login setauth={ setauth }/>
    </div>
  )
}

export default LoginPage