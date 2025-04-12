import React, { useEffect, useState } from "react";
import "./Note.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios'

export default function Note({title, note}) {

  return(
      <div className="note">
      <h3 className="notes">{title}</h3>
      <p className="notes">{note}</p>
      <div className="icons">
        <EditIcon style={{marginLeft: "2px", marginRight: "2px"}}/>
        <DeleteIcon />
      </div>
    </div>
  )
    

}
