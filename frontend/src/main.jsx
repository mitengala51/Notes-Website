import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import NotesPage from "./Pages/NotesPage";
import App from "./Components/App";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
