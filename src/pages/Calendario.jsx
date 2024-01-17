import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import getEvents from '../utils/getEvents'
import AggiungiPrenotazione from '../components/AggiungiPrenotazione'

const Calendario = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Carica gli eventi dal tuo backend quando il componente è montato
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents(); // Sostituisci con il tuo metodo effettivo
      setEvents(eventsData);
    } catch (error) {
      console.error('Errore nel recupero degli eventi:', error);
    }
  };

  return (
    <>
    <AggiungiPrenotazione />
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
    </>
  );
};

export default Calendario;
