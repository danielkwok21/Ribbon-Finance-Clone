import React from 'react';
import Dashboard from './pages/DashboardPage';
import ProductDetail from './pages/ProductDetailPage';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import Header from './components/Header';
import Footer from './components/Footer'

import * as color from '@mui/material/colors';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Portfolio from './pages/PortfolioPage';
import WalletActionPage from './pages/WalletActionPage'

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark',
      common: {
        black: '#121218',
      },
      primary: {
        main: '#fff'
      },
      secondary: {
        main: '#999999'
      }
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
          <Routes>
            <Route path="/product/:name" element={<ProductDetail />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
