import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import TakeNotes from '../Components/TakeNotes'
import './NotesPage.css'

export default function NotesPage() {

  const [show, isShow] = useState(false)

  function onHide(){
    isShow(false)
  }

  function onShow(){
    isShow(true)
  }

  return (
    <div className='MainPage'>
        <Navbar />
        <TakeNotes show={show} isShow={isShow} onClick={onShow}/>
    </div>
  )
}
