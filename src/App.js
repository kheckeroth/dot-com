// src/App.js
import React, { useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import About from './components/about';
import Contact from './components/contact';
import Footer from './components/footer';
import Gallery from './components/gallery';
// You can customize your site's fonts, colors, etc. here
const theme = createTheme({
  palette: {
    primary: {
      main: '#333333', // A dark grey for a professional feel
    },
    background: {
      default: '#121212', // A darker background for a more modern feel
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  const [contactOpen, setContactOpen] = useState(false);

  const handleContactOpen = () => {
    setContactOpen(true);
  };

  const handleContactClose = () => {
    setContactOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <About onContactOpen={handleContactOpen} />
      <Gallery />
      <Contact open={contactOpen} handleClose={handleContactClose} />
      <Footer onContactOpen={handleContactOpen} />
    </ThemeProvider>
  );
}

export default App;