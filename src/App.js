// src/App.js
import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import About from './components/about';
import Gallery from './components/gallery';

// You can customize your site's fonts, colors, etc. here
const theme = createTheme({
  palette: {
    primary: {
      main: '#333333', // A dark grey for a professional feel
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  const handleContactOpen = () => {
    // We'll add the contact modal logic here later
    alert('Contact modal will open here!');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <About onContactOpen={handleContactOpen} />
      <Gallery />
    </ThemeProvider>
  );
}

export default App;