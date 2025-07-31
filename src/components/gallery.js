import React, { useState, useEffect, useRef } from 'react';
import {
    Box, ImageList, ImageListItem, Modal, IconButton, Typography, CircularProgress,
    Alert, Fade, Paper, Chip, Button
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as d3 from 'd3';

const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    aspectRatio: '1 / 1',
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create(['box-shadow', 'transform'], {
        duration: theme.transitions.duration.short,
    }),
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[8],
    },
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
        padding: '25px',
        color: 'white',
        opacity: 0,
    },
    '&:hover .overlay': {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        opacity: 1,
    },
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    }
}));

const SoldBadge = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(3),
    backgroundColor: alpha(theme.palette.error.main, 0.85),
    color: theme.palette.error.contrastText,
    padding: theme.spacing(0.5, 1.5),
    borderRadius: theme.shape.borderRadius,
    fontWeight: 'bold',
    fontSize: '0.8rem',
    backdropFilter: 'blur(4px)',
    zIndex: 1,
}));

const NotForSaleBadge = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(3),
    backgroundColor: alpha(theme.palette.secondary.main, 0.85),
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(0.5, 1.5),
    borderRadius: theme.shape.borderRadius,
    fontWeight: 'bold',
    fontSize: '0.8rem',
    backdropFilter: 'blur(4px)',
    zIndex: 1,
}));

const ModalContent = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '1200px',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    backdropFilter: 'blur(8px)',
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
    flex: '1 1 65%',
    backgroundColor: '#111',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
});

const MediaDescription = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(1.5, 2),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    fontSize: '0.9rem',
}));

const DetailsContainer = styled('div')(({ theme }) => ({
    flex: '1 1 35%',
    padding: theme.spacing(4),
    overflowY: 'auto',
    backgroundColor: '#1e1e1e',
    color: theme.palette.grey[300],

    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#2c2c2c',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.grey[700],
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.grey[600],
    },
}));

function Gallery() {
    const [artPieces, setArtPieces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedArt, setSelectedArt] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const galleryRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://storage.googleapis.com/kens-art-portfolio-assets/art.json?t=${new Date().getTime()}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArtPieces(data.art);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch artwork data:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!loading && artPieces.length > 0) {
            const galleryItems = d3.selectAll('.gallery-item-container');
            const starPath = "M0,-10 L2.3, -5 L8.3, -5 L5, 0 L8.3, 5 L2.3, 5 L0, 10 L-2.3, 5 L-8.3, 5 L-5, 0 L-8.3, -5 L-2.3, -5 Z";
            const timers = new Map();

            galleryItems.on('mouseenter', function() {
                const item = d3.select(this);
                if (timers.has(this)) return;

                item.style('z-index', 10);

                const containerWidth = this.clientWidth;
                const containerHeight = this.clientHeight;
                const svg = item.append('svg').attr('class', 'star-svg');
                const svgWidth = containerWidth * 1.2;
                const svgHeight = containerHeight * 1.2;
                const centerX = svgWidth / 2;
                const centerY = svgHeight / 2;

                const stars = svg.selectAll('.orbiting-star')
                    .data([{ id: 1 }, { id: 2 }])
                    .enter()
                    .append('path')
                    .attr('class', 'orbiting-star')
                    .attr('d', starPath)
                    .attr('transform', `translate(${centerX}, ${centerY}) scale(0)`);

                stars.transition()
                    .duration(500)
                    .ease(d3.easeCubicOut)
                    .attr('transform', `translate(${centerX}, ${centerY}) scale(0.8)`);

                let angle = Math.random() * 2 * Math.PI;

                const timer = d3.timer(elapsed => {
                    angle += 0.002;

                    const primaryOrbitRadius = containerWidth * 0.35;
                    const secondaryOrbitRadius = 40;
                    const barycenterX = centerX + primaryOrbitRadius * Math.cos(angle * 1.2);
                    const barycenterY = centerY + primaryOrbitRadius * Math.sin(angle * 1.2);

                    stars.attr('transform', (d, i) => {
                        const secondaryAngle = angle * 5;
                        const starAngle = secondaryAngle + (i * Math.PI);
                        const x = barycenterX + secondaryOrbitRadius * Math.cos(starAngle);
                        const y = barycenterY + secondaryOrbitRadius * Math.sin(starAngle);
                        const twinkle = 0.8 + Math.sin(elapsed / 300 + i * Math.PI) * 0.1;
                        return `translate(${x}, ${y}) rotate(${elapsed / 10}) scale(${twinkle})`;
                    });
                });
                timers.set(this, timer);
            });

            galleryItems.on('mouseleave', function() {
                const item = d3.select(this);
                const timer = timers.get(this);
                setTimeout(() => { item.style('z-index', 1); }, 300);
                if (timer) {
                    timer.stop();
                    timers.delete(this);
                    const svgWidth = this.clientWidth * 1.2;
                    const svgHeight = this.clientHeight * 1.2;
                    const centerX = svgWidth / 2;
                    const centerY = svgHeight / 2;
                    item.selectAll('.orbiting-star')
                        .transition()
                        .duration(400)
                        .ease(d3.easeCubicIn)
                        .attr('transform', `translate(${centerX}, ${centerY}) scale(0)`)
                        .on('end', function() {
                            if (item.select('.star-svg').node()) {
                                item.select('.star-svg').remove();
                            }
                        });
                }
            });
        }
    }, [loading, artPieces]);

    const handleOpenModal = (artPiece) => {
        setSelectedArt(artPiece);
        setSelectedImageIndex(0);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setTimeout(() => setSelectedArt(null), 300);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? selectedArt.media.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === selectedArt.media.length - 1 ? 0 : prevIndex + 1
        );
    };

    const getPriceDisplay = (item) => {
        if (item.price === 0 || item.price === null) return '';
        return `$${item.price.toFixed(2)}`;
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error" sx={{ m: 3 }}>Failed to load gallery: {error}</Alert>;
    }

    return (
        <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <ImageList ref={galleryRef} variant="standard" cols={3} gap={24} sx={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none', 
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}>
                {artPieces.map((item) => (
                    <div key={item.id} className="gallery-item-container" style={{ position: 'relative' }}>
                        <StyledImageListItem onClick={() => handleOpenModal(item)}>
                            {item.sold ? (
                                <SoldBadge>Sold</SoldBadge>
                            ) : (item.price === 0 || item.price === null) && (
                                <NotForSaleBadge>Not for Sale</NotForSaleBadge>
                            )}

                            {item.media && item.media[0] ? (
                                <img
                                    src={`${item.media[0].url}?w=400&fit=crop&auto=format`}
                                    srcSet={`${item.media[0].url}?w=400&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.name}
                                    loading="lazy"
                                />
                            ) : (
                                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="caption" color="text.secondary">No Image</Typography>
                                </Box>
                            )}
                            <div className="overlay">
                                <Typography variant="h5" className="title">{item.name}</Typography>
                                <Typography variant="body1" className="price">
                                    {getPriceDisplay(item)}
                                </Typography>
                            </div>
                        </StyledImageListItem>
                    </div>
                ))}
            </ImageList>

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                closeAfterTransition
            >
                <Fade in={modalOpen}>
                    <ModalContent>
                        {selectedArt && (() => {
                            const currentMedia = selectedArt.media[selectedImageIndex];
                            const isVideo = currentMedia.url.endsWith('.mp4');
                            
                            const recipientEmail = "kheckeroth@email.com"; 
                            const emailSubject = `Inquiry about "${selectedArt.name}"`;
                            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}`;

                            return (
                                <>
                                    <ImageContainer>
                                        {isVideo ? (
                                            <video
                                                src={currentMedia.url}
                                                style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
                                                controls autoPlay loop muted
                                            />
                                        ) : (
                                            <img
                                                src={currentMedia.url}
                                                alt={currentMedia.description}
                                                style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
                                            />
                                        )}

                                        {currentMedia.description && (
                                            <MediaDescription>{currentMedia.description}</MediaDescription>
                                        )}

                                        {selectedArt.media.length > 1 && (
                                            <>
                                                <IconButton onClick={handlePrevImage} sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}>
                                                    <ArrowBackIosNewIcon />
                                                </IconButton>
                                                <IconButton onClick={handleNextImage} sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}>
                                                    <ArrowForwardIosIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </ImageContainer>
                                    
                                    <DetailsContainer>
                                        <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.500' }}>
                                            <CloseIcon />
                                        </IconButton>

                                        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 300, color: 'rgb(175, 38, 126)' }}>
                                            {selectedArt.name}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <Typography variant="h6" color="primary.light">
                                                {getPriceDisplay(selectedArt)}
                                            </Typography>
                                            {selectedArt.sold && (
                                                <Chip label="Sold" color="error" variant="outlined" />
                                            )}
                                        </Box>

                                        <Typography variant="body1" color="grey.400" paragraph>
                                            {selectedArt.description}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            component="a"
                                            href={mailtoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ 
                                                mt: 2,
                                                textTransform: 'none',
                                                backgroundColor: 'rgb(175, 38, 126)',
                                                '&:hover': {
                                                    backgroundColor: 'rgb(148, 32, 107)'
                                                }
                                            }}
                                        >
                                            Inquire about this piece
                                        </Button>
                                    </DetailsContainer>
                                </>
                            );
                        })()}
                    </ModalContent>
                </Fade>
            </Modal>
        </Box>
    );
}

export default Gallery;