import React, { useEffect, useState } from 'react';
import AggiungiPrenotazione from '../components/AggiungiPrenotazione';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { gapi } from 'gapi-script';
import { Button, CircularProgress, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const GoogleCal = () => {
  const calendarId = `${import.meta.env.VITE_GC_CALENDAR_ID}`;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const loadGapi = () => {
    window.gapi.load('client', () => {
      window.gapi.client.init({
        apiKey: `${import.meta.env.VITE_GC_API_KEY}`,
        clientId: `${import.meta.env.VITE_GC_CLIENT_ID}`,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
      }).then(() => {
        console.log('gapi.client initialized');
        loadEvents();
      }, (error) => {
        console.error('Error initializing gapi.client:', error);
      });
    });
  };

  useEffect(() => {
    loadGapi();
  }, []);

  const loadEvents = () => {
    setLoading(true);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    window.gapi.client.calendar.events
      .list({
        calendarId: calendarId,
        timeMin: now.toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      })
      .then((response) => {
        const eventsData = response.result.items;
        console.log('Events:', eventsData);
        setEvents(eventsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading events:', error);
        setLoading(false);
      });
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ py: [2], minHeight: '100vh' }}>
      <AggiungiPrenotazione />
    <Typography variant="h4" gutterBottom>
        Calendario di Google
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridWeek"
            events={events.map((event) => ({
              title: event.summary,
              start: event.start.dateTime || event.start.date,
              end: event.end.dateTime || event.end.date,
            }))}
            eventClick={handleEventClick}
          />

          <Dialog open={selectedEvent !== null} onClose={handleCloseModal} fullWidth>
            <DialogTitle>
              Dettagli dell'evento
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
                style={{ position: 'absolute', right: 10, top: 10 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {selectedEvent && (
                <>
                  <Typography variant="h6" gutterBottom>
                    {selectedEvent.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Data di inizio: {selectedEvent.startStr}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Data di fine: {selectedEvent.endStr}
                  </Typography>
                  {/* Aggiungi altri dettagli dell'evento qui */}
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Chiudi
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={loadEvents}
        style={{ marginTop: 16 }}
      >
        Carica Eventi
      </Button>
    </Box>
  );
};

export default GoogleCal;