import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEvent from '../components/AddEvent';
import getClienti from '../utils/getClienti';
import getServizi from '../utils/getServizi';
import getEvent from '../utils/getEvent';
import AggiungiPrenotazione from "../components/AggiungiPrenotazione";

function Calendario() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const { data: clientiData } = getClienti();
  const { data: serviziData } = getServizi();
  const { data: eventiData, loading: eventiLoading, error: eventiError } = getEvent();

  const [eventi, setEventi] = useState([]);

  useEffect(() => {
    if (eventiData) {
      setEventi(eventiData);
    }
  }, [eventiData]);

  const handleDateClick = (info) => {
    setSelectedDate(info.date);
    setShowAddEvent(true);
  };

  const handleAddEventClose = () => {
    setShowAddEvent(false);
  };

  const handleAddEventSuccess = (newEvent) => {
    setEventi((prevEventi) => [...prevEventi, newEvent]);
    setShowAddEvent(false);
  };

  const handleOpenAddEvent = () => {
    setSelectedDate(null); // Resetta la data selezionata
    setShowAddEvent(true);
  };

  return (
    <div>
      <AggiungiPrenotazione />

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventi}
        dateClick={handleDateClick}
      />

      {showAddEvent && (
        <AddEvent
          selectedDate={selectedDate}
          clientiData={clientiData}
          serviziData={serviziData}
          onClose={handleAddEventClose}
          onAddEvent={handleAddEventSuccess}
        />
      )}
    </div>
  );
}

export default Calendario;
