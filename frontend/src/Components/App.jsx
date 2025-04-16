import React, { useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import SignUpPage from "../Pages/SignUpPage";
import LoginPage from "../Pages/LoginPage";
import NotesPage from "../Pages/NotesPage";

export default function App() {

  const [AddNote, setAddNote] = useState(false)
  const [auth, setauth] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpPage setauth={setauth}/>} />
          <Route
            path="/login"
            element={<LoginPage setauth={setauth}/>}
          />
          <Route
            path="/Notes"
            element={
                <NotesPage AddNote={AddNote} setAddNote={setAddNote} auth={auth}/>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}


