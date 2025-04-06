import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NotesPage from './Pages/NotesPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotesPage />
  </StrictMode>,
)
