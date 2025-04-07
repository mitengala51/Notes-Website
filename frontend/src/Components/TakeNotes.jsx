import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import './TakeNotes.css'
import { Zoom } from '@mui/material';

export default function TakeNotes() {

    const [show, isShow] = useState(false)

    function onShow(){
        isShow(!show)
    }

  return (
    <div className='NotesForm'>
        <input type='text' placeholder='Title' onClick={onShow} className={show? 'firstInput takeNotes' : 'all-border takeNotes'}/>
        {show? <textarea type='text' placeholder='Take a note' className='secondInput takeNotes'></textarea>: ''}
        <Zoom in={show}><button type='submit'><AddIcon style={{padding: "0", margin: "0"}}/></button></Zoom>
    </div>
  )
}
