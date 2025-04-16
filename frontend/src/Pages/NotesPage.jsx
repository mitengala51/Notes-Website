import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import TakeNotes from '../Components/TakeNotes'
import './NotesPage.css'
import AllNotes from '../Components/AllNotes'

export default function NotesPage({ AddNote, setAddNote }) {

  return (
    <div className='MainPage'>
        <Navbar />
        <TakeNotes StateAddNote={AddNote} setAddNote={setAddNote}/>
        <AllNotes AddNote={AddNote} setAddNote={setAddNote}/>
    </div>
  )
}
