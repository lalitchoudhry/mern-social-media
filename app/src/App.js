
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Home from './pages/HomePage/Home';
import Profile from './pages/ProfilePage/Profile';

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
// import { themeSettings } from "./theme";


function App() {
  const mode = useSelector((state) => state.mode);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/profile/:userId' element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
