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
import Portfolio from './pages/Portfolio';

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
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
          <Routes>
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
