import React, { useState } from 'react';
import { Container, Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BookmarkCard from './../src/components/BookmarkCard';

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

const App = () => {
  const [open, setOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([
    { name: 'Telegram', url: 'https://telegram.org' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' }
  ]);
  const [newBookmark, setNewBookmark] = useState({ name: '', url: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddBookmark = () => {
    setBookmarks([...bookmarks, newBookmark]);
    setNewBookmark({ name: '', url: '' });
    handleClose();
  };

  const handleDeleteBookmark = (index) => {
    setBookmarks(bookmarks.filter((_, i) => i !== index));
  };

  const handleEditBookmark = (index, updatedBookmark) => {
    const updatedBookmarks = [...bookmarks];
    updatedBookmarks[index] = updatedBookmark;
    setBookmarks(updatedBookmarks);
  };

  const handleSearch = (query) => {
    if (query) {
      window.location.href = `https://www.google.com/search?q=${query}`;
    }
  };

  return (
    <Container style={{ backgroundColor: '#303030', minHeight: '100vh', width: '100%', padding: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box textAlign="center" width="100%">
        <Typography variant="h2" color="white" gutterBottom>Google</Typography>
        <TextField
          variant="outlined"
          placeholder="Введите поисковый запрос или URL"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
          InputProps={{
            style: { backgroundColor: 'white', borderRadius: '25px' }
          }}
        />
        <Box mt={2} display="flex" justifyContent="center">
          {bookmarks.map((bookmark, index) => (
            <BookmarkCard
              key={index}
              bookmark={bookmark}
              onDelete={() => handleDeleteBookmark(index)}
              onEdit={(updatedBookmark) => handleEditBookmark(index, updatedBookmark)}
            />
          ))}
          <IconButton color="default" onClick={handleOpen}>
            <AddIcon fontSize="large" style={{ color: 'grey' }} />
          </IconButton>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            label="Название"
            value={newBookmark.name}
            onChange={(e) => setNewBookmark({ ...newBookmark, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="URL"
            value={newBookmark.url}
            onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleAddBookmark} variant="contained" color="primary" fullWidth>
            Добавить
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default App;
