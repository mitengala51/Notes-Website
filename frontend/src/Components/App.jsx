import React, { useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import SignUpPage from "../Pages/SignUpPage";
import LoginPage from "../Pages/LoginPage";
import NotesPage from "../Pages/NotesPage";

export default function App() {

  const [AddNote, setAddNote] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/Notes"
            element={
                <NotesPage AddNote={AddNote} setAddNote={setAddNote}/>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}


