import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Modal, Box, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaTelegram, FaInstagramSquare, FaLinkedin, FaFacebookSquare, FaPinterest } from 'react-icons/fa';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const getIcon = (url) => {
  if (url.includes('telegram')) return <FaTelegram size={50}  />;
  if (url.includes('instagram')) return <FaInstagramSquare size={50}  />;
  if (url.includes('linkedin')) return <FaLinkedin size={50}  />;
  if (url.includes('facebook')) return <FaFacebookSquare size={50}  />;
  if (url.includes('pinterest')) return <FaPinterest size={50}  />;
  return <Typography variant="h4" color="white"></Typography>; 
};

const BookmarkCard = ({ bookmark, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);
  const [editedBookmark, setEditedBookmark] = useState(bookmark);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    onEdit(editedBookmark);
    handleClose();
  };

  return (
    <Card style={{ margin: '0 1rem', backgroundColor: 'transparent' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {getIcon(bookmark.url)}
        <Typography variant="body1" color="white">{bookmark.name}</Typography>
        <Box display="flex">
          <IconButton color="" onClick={handleOpen}>
            <EditIcon />
          </IconButton>
          <IconButton color="" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            label="Название"
            value={editedBookmark.name}
            onChange={(e) => setEditedBookmark({ ...editedBookmark, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="URL"
            value={editedBookmark.url}
            onChange={(e) => setEditedBookmark({ ...editedBookmark, url: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
            Сохранить
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default BookmarkCard;
