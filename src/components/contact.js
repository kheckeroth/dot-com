import React from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1e1e1e',
  border: '1px solid #424242',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  color: '#e0e0e0',
};

const accentColor = 'rgb(175, 38, 126)';

function Contact({ open, handleClose }) {
  const recipientEmail = "kheckeroth@email.com";
  const emailSubject = "Contact from Portfolio Website";
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(recipientEmail);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="contact-modal-title"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="contact-modal-title" variant="h6" component="h2" sx={{ color: 'white', mb: 2 }}>
          Contact Me
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          You can reach me directly via email. Click the button below to open your email client, or copy my address.
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TextField
            fullWidth
            value={recipientEmail}
            readOnly
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: accentColor,
                },
                '&:hover fieldset': {
                  borderColor: accentColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: accentColor,
                },
              },
            }}
            InputProps={{
              style: { color: 'white', backgroundColor: '#2c2c2c' },
            }}
          />
          <IconButton onClick={handleCopy} aria-label="copy email address" sx={{ ml: 1, color: accentColor }}>
            <ContentCopyIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          component="a"
          href={mailtoLink}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          startIcon={<EmailIcon />}
          sx={{
            textTransform: 'none',
            backgroundColor: accentColor,
            '&:hover': {
              backgroundColor: 'rgb(148, 32, 107)',
            },
          }}
        >
          Open Email Client
        </Button>
      </Box>
    </Modal>
  );
}

export default Contact;