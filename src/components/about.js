import React, { useState, useEffect } from 'react'; // MODIFIED: Added useState and useEffect
import { Box, Typography, Paper, Avatar, CircularProgress, Alert } from '@mui/material'; // MODIFIED: Added CircularProgress and Alert

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
        setBlurb(data.blurb); // Get the blurb from the JSON
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
          filter: 'brightness(0.5)',
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
                Kenneth Heckeroth Art
              </Typography>
              
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.9)' }}>
                {loading && <CircularProgress size={24} color="inherit" />}
                {error && <Alert severity="error" sx={{ bgcolor: 'transparent', color: 'red' }}>Could not load bio.</Alert>}
                {blurb}
              </Typography>

            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default AboutMe;