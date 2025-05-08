import React, { useState } from "react";
import "./Note.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";

export default function Note({ id, title, note, setAddNote, AddNote }) {
  const [open, setOpen] = React.useState(false);
  const [UpdateForm, setUpdateForm] = useState({
    title: "",
    note: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function ChangeTitle(e) {
    setUpdateForm({
      ...UpdateForm,
      title: e.target.value,
    });

    console.log(UpdateForm.title);
  }

  function ChangeNote(e) {
    setUpdateForm({
      ...UpdateForm,
      note: e.target.value,
    });

    console.log(UpdateForm.note);
  }

  function UpdateNote() {
    try {
      console.log("Updating Note");

      const result = axios.put("https://notes-website-jjj9.onrender.com/Update-Notes", {
        id: id,
        title: UpdateForm.title,
        note: UpdateForm.note,
      });

      console.log(result)
      // setAddNote(!AddNote)
      setAddNote(prev=>!prev);
      // setAddNote(true)
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteNote() {

    if(!id){
      return console.log("ID not provided")
    }
    
    try {
      const result = await axios.delete("https://notes-website-jjj9.onrender.com/Delete-Notes/" + id)
      console.log(result.message);
      setAddNote(!AddNote)
      // setAddNote(true)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="note">
      <h3 className="notes">{title}</h3>
      <p className="notes">{note}</p>
      <div className="icons">
        <EditIcon
          onClick={handleOpen}
          style={{ marginLeft: "2px", marginRight: "2px", cursor: "pointer" }}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              sx={{ width: "100%", marginBottom: "10px" }}
              defaultValue={title}
              onChange={ChangeTitle}
            />
            <TextField
              id="outlined-multiline-static"
              label="Note"
              multiline
              rows={4}
              // placeholder="Edit the Note"
              sx={{ width: "100%", marginBottom: "10px" }}
              defaultValue={note}
              onChange={ChangeNote}
            />

            <Button
              variant="contained"
              sx={{ textAlign: "center" }}
              onClick={UpdateNote}
            >
              Edit
            </Button>
          </Box>
        </Modal>
        <DeleteIcon onClick={DeleteNote} style={{cursor: "pointer"}}/>
      </div>
    </div>
  );
}
