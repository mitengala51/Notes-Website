import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import TakeNotes from '../Components/TakeNotes'
import './NotesPage.css'
import AllNotes from '../Components/AllNotes'

export default function NotesPage() {

  return (
    <div className='MainPage'>
        <Navbar />
        <TakeNotes />
        <AllNotes />
    </div>
  )
}
