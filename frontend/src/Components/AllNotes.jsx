import React, { useContext, useEffect, useState } from "react";
import Note from "./Note";
import "./AllNotes.css";
import axios from "axios";

export default function AllNotes({ AddNote, setAddNote }) {

  const [Notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("http://localhost:3000/All-Notes");
        setNotes(result.data.Notes);
        console.log(result.data.Notes);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [AddNote]);

  return (
    <div className="NotesList">
      {Notes.map((n) => {
        return <Note key={n.note_id} id={n.note_id} title={n.title} note={n.note} AddNote={AddNote} setAddNote={setAddNote}/>;
      })}
    </div>
  );
}
