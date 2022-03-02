import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import Header from './components/Header';

import * as color from '@mui/material/colors';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: [
        'VCR'
      ].join(',')
    }
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
