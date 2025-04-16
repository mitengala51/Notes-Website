import React from 'react'
import SignUp from '../Components/SignUp'
import './LoginPage.css'

export default function SignUpPage({ setauth }) {
  return (
        <div className='LoginPage' >
          <SignUp setauth={ setauth }/>
        </div>
  )
}
