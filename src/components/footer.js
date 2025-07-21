import React from 'react';
import { Paper, Button } from '@mui/material';

const Footer = ({ onContactOpen }) => {
  return (
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
  );
};

export default Footer;