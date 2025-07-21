import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
  color: 'black', // Set the default text color for the modal to black
};

function Contact({ open, handleClose }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isNotRobot, setIsNotRobot] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeypot) {
      // This is likely a bot
      return;
    }
    if (!isNotRobot) {
      alert('Please confirm you are not a robot.');
      return;
    }
    // Handle form submission logic here (e.g., send to an API endpoint)
    console.log({ email, message });
    setSubmitted(true);
  };

  const handleModalClose = () => {
    setSubmitted(false);
    setEmail('');
    setMessage('');
    setIsNotRobot(false);
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="contact-modal-title"
      aria-describedby="contact-modal-description"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="contact-modal-title" variant="h6" component="h2" sx={{ color: 'black' }}>
          Contact Me
        </Typography>
        {submitted ? (
          <Typography sx={{ mt: 2, color: 'black' }}>
            Thank you for your message!
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              InputLabelProps={{
                style: { color: 'black' },
              }}
              inputProps={{
                style: { color: 'black' },
              }}
            />
            <TextField
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              required
              InputLabelProps={{
                style: { color: 'black' },
              }}
              inputProps={{
                style: { color: 'black' },
              }}
            />
            {/* Honeypot field for bot prevention */}
            <TextField
              fullWidth
              label="Subject"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              margin="normal"
              style={{ display: 'none' }}
            />
            <FormControlLabel
              control={<Checkbox checked={isNotRobot} onChange={(e) => setIsNotRobot(e.target.checked)} sx={{ color: 'black' }} />}
              label="I am not a robot"
              sx={{ color: 'black' }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Send
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
}

export default Contact;