import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NotesPage from "./Pages/NotesPage";
import { BrowserRouter, Route, Router, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotesPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
