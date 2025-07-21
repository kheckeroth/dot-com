import React, { useState, useEffect } from 'react';
import { Box, ImageList, ImageListItem, Modal, IconButton, Typography, CircularProgress, Alert, Fade, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// --- Styled Components for a polished look ---

const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  '& .overlay': {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.short,
    }),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
    color: 'white',
    opacity: 0,
    '& .title, & .price': {
      transform: 'translateY(20px)',
      transition: 'transform 0.3s ease-out',
    },
  },
  '&:hover .overlay': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    opacity: 1,
    '& .title, & .price': {
      transform: 'translateY(0)',
    },
  },
}));

const SoldBadge = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  left: theme.spacing(1.5),
  backgroundColor: 'rgba(192, 57, 43, 0.85)',
  color: 'white',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 'bold',
  fontSize: '0.8rem',
  backdropFilter: 'blur(4px)',
}));


const ModalContent = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '1200px',
  maxHeight: '90vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: theme.palette.background.paper,
  boxShadow: 24,
  outline: 'none',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    width: '95vw',
    maxHeight: '85vh',
  },
}));

const ImageContainer = styled('div')({
  position: 'relative',
  flex: '1 1 65%', // Takes up 65% of the width
  backgroundColor: '#111',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const DetailsContainer = styled('div')(({ theme }) => ({
  flex: '1 1 35%', // Takes up 35% of the width
  padding: theme.spacing(4),
  overflowY: 'auto',
}));

// --- Main Gallery Component ---

function Gallery() {
  // State for data, loading, and errors
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch data from your JSON file on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://storage.googleapis.com/kens-art-portfolio-assets/art.json?t=${new Date().getTime()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtPieces(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch artwork data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // --- Modal and Image Navigation Handlers ---

  const handleOpenModal = (artPiece) => {
    setSelectedArt(artPiece);
    setSelectedImageIndex(0);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedArt(null); // Clear selection on close
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedArt.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === selectedArt.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // --- Render Logic ---

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 3 }}>Failed to load gallery: {error}</Alert>;
  }

  return (
    <Box sx={{ mt: '-15vh', p: { xs: 1, sm: 2, md: 3 } }}>
      <ImageList variant="masonry" cols={3} gap={16}>
        {artPieces.map((item) => (
          <StyledImageListItem key={item.id} onClick={() => handleOpenModal(item)}>
            <img
              src={`${item.images[0]}?w=400&fit=crop&auto=format`}
              srcSet={`${item.images[0]}?w=400&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
              style={{ width: '100%', display: 'block' }}
            />
            {item.sold && <SoldBadge>Sold</SoldBadge>}
            <div className="overlay">
              <Typography variant="h6" className="title">{item.name}</Typography>
              <Typography variant="body1" className="price">
                {item.sold ? 'N/A' : `$${item.price.toFixed(2)}`}
              </Typography>
            </div>
          </StyledImageListItem>
        ))}
      </ImageList>

      {/* The Modal for Detailed View */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={modalOpen}>
          <ModalContent>
            {selectedArt && (
              <>
                <ImageContainer>
                  <img
                    src={selectedArt.images[selectedImageIndex]}
                    alt={`${selectedArt.name} - view ${selectedImageIndex + 1}`}
                    style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
                  />
                  {selectedArt.images.length > 1 && (
                    <>
                      <IconButton onClick={handlePrevImage} sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)'} }}>
                        <ArrowBackIosNewIcon />
                      </IconButton>
                      <IconButton onClick={handleNextImage} sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)'} }}>
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </>
                  )}
                </ImageContainer>

                <DetailsContainer>
                  <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 8, right: 8, color: 'text.secondary' }}>
                    <CloseIcon />
                  </IconButton>
                  
                  <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 300 }}>
                    {selectedArt.name}
                  </Typography>

                  {selectedArt.sold ? (
                    <Chip label="Sold" color="error" variant="outlined" sx={{ mb: 2 }} />
                  ) : (
                    <Typography variant="h4" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                      ${selectedArt.price.toFixed(2)}
                    </Typography>
                  )}

                  <Typography variant="body1" color="text.secondary" paragraph>
                    {selectedArt.description}
                  </Typography>

                  {/* You could add more details here like dimensions, medium, etc. */}
                </DetailsContainer>
              </>
            )}
          </ModalContent>
        </Fade>
      </Modal>
    </Box>
  );
}

export default Gallery;