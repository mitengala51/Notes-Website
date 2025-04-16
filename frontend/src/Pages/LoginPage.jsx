import React from 'react'
import './LoginPage.css'
import Login from '../Components/Login'

function LoginPage({ assignToken }) {

  return (
    <div className='LoginPage' >
      <Login assignTokenToLP={ assignToken }/>
    </div>
  )
}

export default LoginPage