import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import "./TakeNotes.css";
import { Zoom } from "@mui/material";
import axios from "axios";

export default function TakeNotes({ StateAddNote ,setAddNote }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    title: "",
    note: "",
  });

  // Set the TextArea Hide or show
  function onShow() {
    setShow(!show);
  }

  // Form Title Input
  function handleTitle(e) {
    setForm({
      ...form,
      title: e.target.value,
    });

    console.log(form.title);
  }

  // Form Note Input
  function handleNote(e) {
    setForm({
      ...form,
      note: e.target.value,
    });

    console.log(form.note);
  }

  // Send Data to API
  function AddNote() {
    const data = axios.post("https://notes-website-jjj9.onrender.com/Create-Notes", {
      title: form.title,
      note: form.note,
    });

    console.log(data.message);
    // setAddNote(!StateAddNote)
    setAddNote(prev => !prev)
    // setAddNote(true)
  }

  return (
    <div className="NotesForm">
      <input
        type="text"
        placeholder="Title"
        name="title"
        onClick={onShow}
        className={show ? "firstInput takeNotes" : "all-border takeNotes"}
        onChange={handleTitle}
        required
      />
      {show ? (
        <textarea
          type="text"
          placeholder="Take a note"
          name="description"
          className="secondInput takeNotes"
          onChange={handleNote}
          required
        ></textarea>
      ) : (
        ""
      )}
      <Zoom in={show}>
        <button type="submit" onClick={AddNote}>
          <AddIcon style={{ padding: "0", margin: "0" }} />
        </button>
      </Zoom>
    </div>
  );
}
