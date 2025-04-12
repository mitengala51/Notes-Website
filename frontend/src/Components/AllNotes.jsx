import React, { useEffect, useState } from 'react'
import Note from './Note'
import './AllNotes.css'
import axios from 'axios'

export default function AllNotes() {

    const [Notes, setNotes] = useState([])

  useEffect(()=>{
    async function fetchData() {
      const result = await axios.get("http://localhost:3000/All-Notes")
      setNotes(result.data.Notes)
      console.log(result.data.Notes)
    }
    fetchData()
  },[])

  return (
    <div className='NotesList'> 
        {Notes.map((n)=>{
          return(
            <Note key={n.id} title={n.title} note={n.note}/>
          )
        })}
    </div>
  )
}
