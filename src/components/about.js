import React from 'react';
import { Box, Typography, Button, Paper, Avatar } from '@mui/material';

const videoPath = 'https://storage.googleapis.com/kens-art-portfolio-assets/Nebula_Scene_Video_Generation_Request.mp4';

const AboutMe = ({ onContactOpen }) => {
  return (
    <>
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

      {/* Main container to center the content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start', // Align items to the top
          height: 'calc(100vh - 100px)', // Adjust height to account for footer
          color: 'white',
          textAlign: 'center',
          p: 3, // Adds some padding
          paddingTop: '15vh', // Move content down from the top
        }}
      >
        {/* The semi-transparent box holding your content */}
        <Paper
          elevation={3}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: { xs: '1.5rem', md: '2rem 3rem' }, // Responsive padding
            borderRadius: '15px',
            maxWidth: '900px',
            fontFamily: "'Helvetica Neue', sans-serif",
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
          }}
        >
          <Avatar
            alt="Kenneth Heckeroth"
            src="https://storage.googleapis.com/kens-art-portfolio-assets/headshot.jpeg"
            sx={{ width: 150, height: 150, mb: { xs: 2, md: 0 } }}
          />
          <Box textAlign={{ xs: 'center', md: 'left' }}>
            {/* Your Name */}
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              Kenneth Heckeroth
              Art
            </Typography>

            {/* Your Bio Text */}
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' }, // Responsive font size
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)' // Slightly off-white for better readability
              }}
            >
              My work begins where the telescope ends. Since 2016, I have used resin and pigment not to paint pictures of the cosmos, but to create physical artifacts of the awe it inspires. Each piece is an exploration of deep time, cosmic light, and the profound questions that arise when we contemplate our place in the universe. By manipulating layers of translucent color and suspended metallic dust, I seek to capture the tension between the chaotic beauty of a nebula's birth and the silent, ordered vastness of space. Each piece is a discovery; a new star cluster revealed in a swirl of mica, a distant galaxy emerging from a cloud of color. My process is a form of meditation on reality itself, offering the viewer a tangible object to hold while pondering the intangible.
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Opaque Footer */}
      <Paper
        elevation={4}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
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
      </Paper>
    </>
  );
};

export default AboutMe;