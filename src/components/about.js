import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, CircularProgress, Alert } from '@mui/material';

const videoPath = 'https://storage.googleapis.com/kens-art-portfolio-assets/Nebula_Scene_Video_Generation_Request.mp4';

const AboutMe = ({ onContactOpen }) => {
  const [blurb, setBlurb] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`https://storage.googleapis.com/kens-art-portfolio-assets/art.json?t=${new Date().getTime()}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setBlurb(data.blurb); 
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []); 

  return (
    <>
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
          filter: 'brightness(0.9)',
        }}
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      <Box sx={{ color: 'white', pb: '120px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
            textAlign: 'center',
            p: 3,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)',
              padding: { xs: '2rem', md: '3rem 4rem' },
              borderRadius: '20px',
              maxWidth: '1000px',
              fontFamily: "'Helvetica Neue', sans-serif",
              display: 'flex',
              flexDirection: 'column', 
              gap: 3, 
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 2, md: 4 },
              width: '100%',
              textAlign: { xs: 'center', md: 'left' }
            }}>
              <Avatar
                alt="Kenneth Heckeroth"
                src="https://storage.googleapis.com/kens-art-portfolio-assets/headshot.jpeg"
                sx={{
                  width: 180,
                  height: 180,
                  border: '3px solid rgba(255, 255, 255, 0.8)',
                  transition: 'box-shadow 0.4s ease-in-out, transform 0.3s ease-in-out',
                  boxShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: `
                      0 0 8px rgba(255, 255, 255, 1),
                      0 0 25px rgba(100, 200, 255, 0.8),
                      0 0 50px rgba(0, 150, 255, 0.6)
                    `,
                  }
                }}
              />
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white', letterSpacing: '1px' }}>
                Celestial Art Works
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: '1rem', md: '1.25rem' }, 
                lineHeight: 1.5, 
                color: 'rgba(255, 255, 255, 0.9)',
                whiteSpace: 'pre-line',
                textAlign: { xs: 'center', md: 'left' }
              }}>
                {loading && <CircularProgress size={24} color="inherit" />}
                {error && <Alert severity="error" sx={{ bgcolor: 'transparent', color: 'red' }}>Could not load bio.</Alert>}
                {blurb}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                textAlign: 'right',
                fontStyle: 'italic',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                — Kenneth Heckeroth
            </Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default AboutMe;