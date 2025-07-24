import React from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

function Contact({ open, handleClose }) {

  // --- Mailto Configuration ---
  const recipientEmail = "kheckeroth@email.com";
  const emailSubject = "Contact from Portfolio Website";
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(recipientEmail).then(() => {

    });
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
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="contact-modal-title" variant="h6" component="h2" sx={{ color: 'black', mb: 2 }}>
          Contact Me
        </Typography>

        <Typography variant="body1" sx={{ color: 'black', mb: 2 }}>
            You can reach me directly via email. Click the button below to open your email client, or copy my address.
        </Typography>

        {/* Display email with a copy button */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextField
                fullWidth
                value={recipientEmail}
                readOnly
                variant="outlined"
                size="small"
                InputProps={{
                    style: { color: 'black', backgroundColor: '#f0f0f0' },
                }}
            />
            <IconButton onClick={handleCopy} aria-label="copy email address" sx={{ ml: 1, color: 'black' }}>
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
        >
            Open Email Client
        </Button>
      </Box>
    </Modal>
  );
}

export default Contact;