
import {BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
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
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={isAuth ? <Home /> : <Navigate to="/" />}/>
        <Route path='/profile/:userId' element={isAuth ? <Profile /> : <Navigate to="/" />}/>
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
