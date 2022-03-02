import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>

          <Dashboard />
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
