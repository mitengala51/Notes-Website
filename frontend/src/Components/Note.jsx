import React from "react";
import "./Note.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Note() {
  return (
    <div className="note">
      <h3 className="notes">first</h3>
      <p className="notes">
        The patient has been diagnosed with
        pneumonoultramicroscopicsilicovolcanoconiosis and will be taken into
        intensive care.
      </p>
      <div className="icons">
        <EditIcon style={{marginLeft: "2px", marginRight: "2px"}}/>
        <DeleteIcon />
      </div>
    </div>
  );
}
