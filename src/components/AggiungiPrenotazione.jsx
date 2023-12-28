import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

import postEvent from '../utils/postEvent';
import getClienti from '../utils/getClienti';
import getServizi from '../utils/getServizi';

const AggiungiPrenotazione = () => {
  const { response, error, loading, postData } = postEvent();

  const [formData, setFormData] = useState({
    id: '',
    start: '',
    end: '',
    nome: '',
    cognome: '',
    servizio: '',
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Modifica la struttura del payload in base alle specifiche della tua API
      const payload = {
        start: formData.start,
        end: formData.end,
        title: formData.nome, // Utilizza solo il nome del cliente
        extendedProps: {
          servizi: formData.servizio, // Inserisci il valore corretto per "servizi" in base alle tue esigenze
        },
      };
        
      // Invia la richiesta POST con il nuovo payload
      const response = await postData(payload);
  
      // Controlla la risposta dalla API e gestisci di conseguenza
      if (response?.data) {
        // La chiamata è andata a buon fine, puoi gestire la risposta qui se necessario
        console.log('Risposta dalla API:', response.data);
      }
  
      // Resetta il form
      setFormData({
        id: '',
        start: '',
        end: '',
        nome: '',
        cognome: '',
        servizio: '',
      });
    } catch (error) {
      // Gestisci gli errori qui
      console.error('Errore durante la richiesta API', error);
    }
  };

  
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'nome') {
      const selectedCliente = clienti.find((cliente) => cliente.nome === value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: selectedCliente.id,
        nome: selectedCliente.nome,
        cognome: selectedCliente.cognome,
      }));
    } else {
      // Altrimenti, aggiorna solo il campo corrente
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    data: responseData,
    error: clientiError,
    loading: clientiLoading,
  } = getClienti();

  const [clienti, setClienti] = useState([]);

  useEffect(() => {
    if (responseData?.data) {
      setClienti(responseData.data);
    }
  }, [responseData]);

  const {
    data: responseServiceData,
    error: serviziError,
    loading: serviziLoading,
  } = getServizi('http://localhost:5002/api/servizi?size=999999999');

  const [servizi, setServizi] = useState([]);

  useEffect(() => {
    if (responseServiceData?.data) {
      setServizi(responseServiceData.data);
    }
  }, [responseServiceData]);

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={openSidebar}
        size="large"
        style={{ color: 'white' }}
      >
        Aggiungi Prenotazione
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
        }}
      >
        <Box p={2}>
          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={closeSidebar}>
              <CloseIcon />
            </Button>
          </Stack>
          <Typography>Inserisci nuova prenotazione</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              label="Data di inizio"
              name="start"
              value={formData.start}
              onChange={(event) => {
                handleChange(event);
                // Aggiorna anche il campo "end" con lo stesso valore di "start"
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  end: event.target.value,
                }));
              }}
            />
            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={formData.nome}
                onChange={handleChange}
                label="Cliente"
                name="nome"
              >
                {clienti &&
                  clienti.map((cliente) => (
                    <MenuItem key={cliente.id} value={cliente.nome}>
                      {cliente.nome} {cliente.cognome}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel>Servizio</InputLabel>
              <Select
                value={formData.servizio}
                onChange={handleChange}
                label="Servizio"
                name="servizio"
              >
                {servizi &&
                  servizi.map((servizio) => (
                    <MenuItem key={servizio.id} value={servizio.nome}>
                      {servizio.nome}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {console.log(formData.start, formData.id, formData.nome, formData.cognome, formData.end, formData.servizio)}
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '10px' }}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              disabled={loading}
            >
              {loading ? 'Inviando...' : 'Aggiungi prenotazione'}
            </Button>
          </form>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default AggiungiPrenotazione;
