import React from 'react';
import { Paper, Button, Box, IconButton, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const Footer = ({ onContactOpen }) => {
  const instagramUrl = 'https://www.instagram.com/mindless_analysis';
  const accentColor = 'rgb(175, 38, 126)';

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={onContactOpen}
          startIcon={<EmailIcon />}
          sx={{
            textTransform: 'none',
            bgcolor: accentColor,
            '&:hover': {
              bgcolor: 'rgb(148, 32, 107)',
            },
          }}
        >
          Contact Me
        </Button>

        <IconButton
          component="a"
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Profile"
          sx={{
            color: 'white',
            transition: 'color 0.3s ease, transform 0.3s ease',
            '&:hover': {
              color: accentColor,
              transform: 'scale(1.1)',
            },
          }}
        >
          <InstagramIcon sx={{ fontSize: '2.5rem' }} />
        </IconButton>
      </Box>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
        Kenneth Heckeroth | Artist in Tacoma, WA
      </Typography>
    </Paper>
  );
};

export default Footer;