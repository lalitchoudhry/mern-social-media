
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/LoginPage';
import Home from './pages/HomePage/HomePage';
import Profile from './pages/ProfilePage/ProfilePage';

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./styles/theme";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme =  useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/profile/:userId' element={<Profile />}/>
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
