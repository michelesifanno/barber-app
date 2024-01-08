import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import postServizi from '../utils/postServizi';
import { Typography, InputAdornment } from '@mui/material';

const AddService = () => {
  const { response, error, loading, postData } = postServizi();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    lavoro: '',
    telefono: '',
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postData(formData);
      setFormData({
        nome: '',
        prezzo: '',
        durata: '',
      });
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Errore durante la richiesta API', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={openSidebar}
        size="large"
      >
        Aggiungi servizio
      </Button>

      <SwipeableDrawer
        anchor="right"
        open={sidebarOpen}
        onClose={closeSidebar}
        onOpen={openSidebar}
        sx={{
          width: isDesktop ? '25%' : '100%',
          '& .MuiDrawer-paper': {
            width: isDesktop ? '25%' : '100%',
          },
        }}        >
        <Box p={2}>
          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={closeSidebar}>
              <CloseIcon />
            </Button>
          </Stack>
          <Typography>Aggiungi nuovo servizio</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              label="Prezzo"
              name="prezzo"
              value={formData.prezzo}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              label="Durata"
              name="durata"
              value={formData.durata}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">min.</InputAdornment>,
              }}
            />

            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} /> : null}
              disabled={loading}
            >
              {loading ? 'Inviando...' : 'Aggiungi servizio'}
            </Button>
          </form>

          <Snackbar
            open={snackbarOpen}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              Servizio aggiunto con successo! Aggiorna la pagina per vedere la lista aggiornata!
            </Alert>
          </Snackbar>


        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default AddService;
