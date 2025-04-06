import React from 'react'
import noteicon from '../assets/notes-plus-svgrepo-com.svg'
import './Navbar.css'

export default function () {
  return (
    <div className='navbar'>
        <div className='logo'>
        <img src={noteicon} width={24} height={24}></img>
            <span className='textlogo'>Keep Taking Notes</span>
        </div>
    </div>
  )
}
