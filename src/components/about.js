import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';

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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          zIndex: -1,
          objectFit: 'cover',
          filter: 'brightness(0.5)',
        }}
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      {/* Main Content Container */}
      <Box sx={{ color: 'white', pb: '120px' /* Padding at the bottom to avoid overlap with footer */ }}>
        {/* "About Me" Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh', /* Changed from 90vh to move it up */
            textAlign: 'center',
            p: 3,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              padding: { xs: '2rem', md: '3rem 4rem' },
              borderRadius: '20px',
              maxWidth: '1000px',
              fontFamily: "'Helvetica Neue', sans-serif",
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Avatar
              alt="Kenneth Heckeroth"
              src="https://storage.googleapis.com/kens-art-portfolio-assets/headshot.jpeg"
              sx={{ width: 180, height: 180, mb: { xs: 2, md: 0 }, border: '3px solid rgba(255, 255, 255, 0.8)' }}
            />
            <Box textAlign={{ xs: 'center', md: 'left' }}>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white', letterSpacing: '1px' }}>
                Kenneth Heckeroth
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.9)' }}>
                My work begins where the telescope ends. Since 2016, I have used resin and pigment not to paint pictures of the cosmos, but to create physical artifacts of the awe it inspires. Each piece is an exploration of deep time, cosmic light, and the profound questions that arise when we contemplate our place in the universe. By manipulating layers of translucent color and suspended metallic dust, I seek to capture the tension between the chaotic beauty of a nebula's birth and the silent, ordered vastness of space. Each piece is a discovery; a new star cluster revealed in a swirl of mica, a distant galaxy emerging from a cloud of color. My process is a form of meditation on reality itself, offering the viewer a tangible object to hold while pondering the intangible.              
              </Typography>
            </Box>
          </Paper>
        </Box>

      </Box>
    </>
  );
};

export default AboutMe;