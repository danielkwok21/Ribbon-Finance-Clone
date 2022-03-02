import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import Header from './components/Header';

import * as color from '@mui/material/colors';

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
        <Dashboard />
      </ThemeProvider>
    </div>
  );
}

export default App;
