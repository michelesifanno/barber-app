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
import { gapi } from 'gapi-script';

const AggiungiPrenotazione = () => {
  const { response, error, loading, postData } = postEvent();

  const [formData, setFormData] = useState({
    start: '',
    idCliente: '',
    idServizio: '',
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Payload before submission:', formData);

      const payload = {
        start: new Date(formData.start).toISOString(),
        end: new Date(calculateEndDate()).toISOString(),
        title: `${formData.idServizio}`, // Cambiato da "idCliente" a "idServizio"
        extendedProps: {
          servizi: [formData.idServizio],
        },
      };

      const response = await postData(payload);

      if (response?.data) {
        console.log('Risposta dalla API:', response.data);

        // Ora aggiungi l'evento al calendario di Google
        const googleEvent = {
          summary: `${formData.idServizio}`, // Titolo dell'evento
          description: `${formData.idCliente}`, // Descrizione dell'evento
          start: {
            dateTime: new Date(formData.start).toISOString(),
            timeZone: 'UTC',
          },
          end: {
            dateTime: new Date(calculateEndDate()).toISOString(),
            timeZone: 'UTC',
          },
        };

        const calendarId = `${import.meta.env.VITE_GC_CALENDAR_ID}`;

        // Aggiungi l'evento al calendario di Google
        await gapi.client.calendar.events.insert({
          calendarId: calendarId,
          resource: googleEvent,
        });

        console.log('Evento aggiunto al calendario di Google.');
      }

      setFormData({
        start: '',
        idCliente: '',
        idServizio: '',
      });

      closeSidebar();
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

  const calculateEndDate = () => {
    const { start, idServizio } = formData;

    if (!start || !idServizio) {
      return '';
    }

    const startDate = new Date(start);
    const serviceDuration =
      servizi.find((s) => s.id === idServizio)?.durata || 0;
    const endDate = new Date(startDate.getTime() + serviceDuration * 60000);

    return endDate.toISOString();
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
  } = getServizi();

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
              type="datetime-local"
              value={formData.start}
              onChange={handleChange}
            />
            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={formData.idCliente}
                onChange={handleChange}
                label="Cliente"
                name="idCliente"
              >
                {clienti &&
                  clienti.map((cliente) => (
                    <MenuItem key={cliente.id} value={cliente.id}>
                      {cliente.nome} {cliente.cognome}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel>Servizio</InputLabel>
              <Select
                value={formData.idServizio}
                onChange={handleChange}
                label="Servizio"
                name="idServizio"
              >
                {servizi &&
                  servizi.map((servizio) => (
                    <MenuItem key={servizio.id} value={servizio.id}>
                      {servizio.nome}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
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
