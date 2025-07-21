import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import Footer from './footer'; // Import the new Footer component
import gallery from './gallery'; // Assuming your gallery component is named ArtGallery

// The path to the video in the `public` folder.
const videoPath = 'https://storage.googleapis.com/kens-art-portfolio-assets/Nebula_Scene_Video_Generation_Request.mp4';

const AboutMe = ({ onContactOpen }) => {
  return (
    <>
      {/* Background Video */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        sx={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          zIndex: -1,
          objectFit: 'cover',
          filter: 'brightness(0.7)',
        }}
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      {/* Main Content Container for About Me and Gallery */}
      <Box sx={{ color: 'white', pb: '120px' /* Padding at the bottom to avoid overlap with footer */ }}>
        {/* "About Me" Section Container */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // Vertically center content
            minHeight: '80vh',   // Adjust height as needed
            textAlign: 'center',
            p: 3,
          }}
        >
          {/* Semi-transparent box for "About Me" */}
          <Paper
            elevation={3}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: { xs: '1.5rem', md: '2rem 3rem' },
              borderRadius: '15px',
              maxWidth: '900px',
              fontFamily: "'Helvetica Neue', sans-serif",
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              mt: '5vh', // Move the "About Me" section up
            }}
          >
            <Avatar
              alt="Kenneth Heckeroth"
              src="https://storage.googleapis.com/kens-art-portfolio-assets/headshot.jpeg"
              sx={{ width: 150, height: 150, mb: { xs: 2, md: 0 } }}
            />
            <Box textAlign={{ xs: 'center', md: 'left' }}>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                Kenneth Heckeroth Art
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.9)' }}>
                My work begins where the telescope ends. Since 2016, I have used resin and pigment not to paint pictures of the cosmos, but to create physical artifacts of the awe it inspires. Each piece is an exploration of deep time, cosmic light, and the profound questions that arise when we contemplate our place in the universe. By manipulating layers of translucent color and suspended metallic dust, I seek to capture the tension between the chaotic beauty of a nebula's birth and the silent, ordered vastness of space. Each piece is a discovery; a new star cluster revealed in a swirl of mica, a distant galaxy emerging from a cloud of color. My process is a form of meditation on reality itself, offering the viewer a tangible object to hold while pondering the intangible.
              </Typography>
            </Box>
          </Paper>
        </Box>
        

      </Box>

      {/* Use the new Footer component */}
      <Footer onContactOpen={onContactOpen} />
    </>
  );
};

export default AboutMe;