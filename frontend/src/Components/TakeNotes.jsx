import React, { useState } from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import './TakeNotes.css'

export default function TakeNotes() {

    const [show, isShow] = useState(false)

    function onShow(){
        isShow(!show)
    }

  return (
    <div className='NotesForm'>
        <input type='text' placeholder='Title' onClick={onShow} className={show? 'firstInput takeNotes' : 'all-border takeNotes'}/>
        {show? <textarea type='text' placeholder='Take a note' className='secondInput takeNotes'></textarea>: ''}
    </div>
  )
}
