// src/components/About.js
import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';

// Replace with a URL to a picture of you!
const profileImageUrl = '/profile.jpg'; 

function About({ onContactOpen }) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: '#f5f5f5',
        p: 3,
      }}
    >
      <Avatar
        alt="Artist Name"
        src={profileImageUrl}
        sx={{ width: 150, height: 150, mb: 2 }}
      />
      <Typography variant="h2" component="h1" gutterBottom>
        Your Name
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '600px', mb: 4 }}>
        A brief, compelling sentence about your art. For example: "I explore the intersection of nature and technology through vibrant digital paintings."
      </Typography>
      <Button variant="contained" size="large" onClick={onContactOpen}>
        Contact Me
      </Button>
    </Box>
  );
}

export default About;