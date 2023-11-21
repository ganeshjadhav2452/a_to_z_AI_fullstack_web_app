import React, { useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme'
import { Toaster } from "react-hot-toast";
import Summary from './pages/Summary.js'
import Paragraph from './pages/Paragraph'
import ChatBot from './pages/ChatBot'
import JsConverter from './pages/JsConverter'
import ScifiImage from './pages/ScifiImage'

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Toaster />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/paragraph" element={<Paragraph />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/js-converter" element={<JsConverter />} />
          <Route path="/scifi-image" element={<ScifiImage />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App