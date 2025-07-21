// src/components/Gallery.js
import React, { useState } from 'react';
import { Box, ImageList, ImageListItem, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// List your artwork here
const artPieces = [
  { img: '/images/art1.jpg', title: 'Artwork 1' },
  { img: '/images/art2.jpg', title: 'Artwork 2' },
  { img: '/images/art3.jpg', title: 'Artwork 3' },
  { img: '/images/art4.jpg', title: 'Artwork 4' },
  // ...add all your art pieces
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

function Gallery() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? artPieces.length - 1 : prevIndex - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === artPieces.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box sx={{ p: 3 }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {artPieces.map((item, index) => (
          <ImageListItem key={item.img} onClick={() => handleOpen(index)} sx={{ cursor: 'pointer' }}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={handlePrev} sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <img 
            src={artPieces[currentIndex].img} 
            alt={artPieces[currentIndex].title} 
            style={{ maxHeight: '90vh', maxWidth: '90vw' }}
          />
          <IconButton onClick={handleNext} sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Modal>
    </Box>
  );
}

export default Gallery;