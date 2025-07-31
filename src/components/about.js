import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, CircularProgress, Alert } from '@mui/material';

// CHANGE: Updated the recommended font import to include a lighter '300' weight for more crispness.
// <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;700&display=swap" rel="stylesheet">

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

  const highlightColor = 'rgb(233, 0, 255)';

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
              backdropFilter: 'blur(20px)',
              padding: { xs: '2rem', md: '3rem 4rem' },
              borderRadius: '5px',
              maxWidth: '1000px',
              fontFamily: "'Oxanium', sans-serif",
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 400, letterSpacing: '1px', textAlign: 'left' }}>
              Celestial Works by <span style={{ color: highlightColor }}>Kenneth Heckeroth</span>
            </Typography>

            <Typography
              variant="body1" 
              sx={{
                fontWeight: 300,
                fontSize: { xs: '1rem', md: '1.15rem' }, 
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)',
                whiteSpace: 'pre-line',
                textAlign: 'left'
              }}>
              {loading && <CircularProgress size={24} color="inherit" />}
              {error && <Alert severity="error" sx={{ bgcolor: 'transparent', color: 'red' }}>Could not load bio.</Alert>}
              {blurb}
            </Typography>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: 2,
            }}>
              <Avatar
                alt="Kenneth Heckeroth"
                src="https://storage.googleapis.com/kens-art-portfolio-assets/headshot.jpg"
                sx={{
                  width: 60,
                  height: 60,
                  border: '3px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
                }}
              />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: '1.2rem' }}>
                  Kenneth Heckeroth
                </Typography>
                <Typography variant="body1" sx={{ color: highlightColor, fontWeight: 300 }}>
                  Artist and Creator
                </Typography>
              </Box>
            </Box>

          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default AboutMe;