import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import TakeNotes from '../Components/TakeNotes'
import './NotesPage.css'
import AllNotes from '../Components/AllNotes'
import { Navigate } from "react-router-dom";

export default function NotesPage({ AddNote, setAddNote, auth }) {

  return auth? (
    <div className='MainPage'>
        <Navbar />
        <TakeNotes StateAddNote={AddNote} setAddNote={setAddNote}/>
        <AllNotes AddNote={AddNote} setAddNote={setAddNote}/>
    </div> 
  ) : <Navigate to="https://notes-website-amber.vercel.app/login" replace />
}
