import React from 'react';
import { Box, Typography, Button } from '@mui/material';

// The path to the video in the `public` folder.
// Make sure you have a `/public/video/nebula-fly-through.mp4` file.
const videoPath = 'https://storage.googleapis.com/kens-art-portfolio-assets/Nebula_Scene_Video_Generation_Request.mp4';

const AboutMe = ({ onContactOpen }) => {
  return (
    <>
      {/* The video element now serves as a background */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        sx={{
          position: 'fixed', // Stays in place
          right: 0,
          bottom: 0,
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          zIndex: -1, // Places it behind all other content
          objectFit: 'cover', // Ensures it covers the screen without distortion
          filter: 'brightness(0.7)', // Darkens the video to improve text readability
        }}
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      {/* Main container to center the content vertically and horizontally */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Takes up the full screen height
          color: 'white',
          textAlign: 'center',
          p: 3, // Adds some padding
        }}
      >
        {/* The semi-transparent box holding your content */}
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: { xs: '1.5rem', md: '2rem 3rem' }, // Responsive padding
            borderRadius: '10px',
            maxWidth: '800px',
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
        >
          {/* Your Name */}
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Kenneth Heckeroth 
            Art
          </Typography>

          {/* Your Bio Text */}
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, // Margin bottom for spacing
              fontSize: { xs: '1rem', md: '1.25rem' }, // Responsive font size
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.9)' // Slightly off-white for better readability
            }}
          >
            My work begins where the telescope ends. Since 2016, I have used resin and pigment not to paint pictures of the cosmos, but to create physical artifacts of the awe it inspires. Each piece is an exploration of deep time, cosmic light, and the profound questions that arise when we contemplate our place in the universe. By manipulating layers of translucent color and suspended metallic dust, I seek to capture the tension between the chaotic beauty of a nebula's birth and the silent, ordered vastness of space. Each piece is a discovery; a new star cluster revealed in a swirl of mica, a distant galaxy emerging from a cloud of color. My process is a form of meditation on reality itself, offering the viewer a tangible object to hold while pondering the intangible.
          </Typography>

          {/* Contact Button */}
          <Button 
            variant="contained" 
            size="large" 
            onClick={onContactOpen}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            Contact Me
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AboutMe;
