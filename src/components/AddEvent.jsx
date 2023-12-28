import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import {
  Drawer,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import postEvent from "../utils/postEvent";
import getClienti from "../utils/getClienti";
import getServizi from "../utils/getServizi";
import "react-datetime/css/react-datetime.css";

const AddEvent = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cliente, setCliente] = useState("");
  const [servizio, setServizio] = useState("");
  const [durataServizio, setDurataServizio] = useState(0);

  const {
    data: clientiData,
    error: clientiError,
    loading: clientiLoading,
  } = getClienti();

  const [clienti, setClienti] = useState([]);

  useEffect(() => {
    if (clientiData?.data) {
      setClienti(clientiData.data);
    }
  }, [clientiData]);

  const {
    data: serviziData,
    error: serviziError,
    loading: serviziLoading,
  } = getServizi();

  const [servizi, setServizi] = useState([]);

  useEffect(() => {
    if (serviziData?.data) {
      setServizi(serviziData.data);
    }
  }, [serviziData]);

  const { postEvent, loading: postLoading, error: postError } = postEvent();

  const handleAddEvent = () => {
    const endDate = new Date(selectedDate);
    endDate.setMinutes(endDate.getMinutes() + parseInt(durataServizio, 10));

    const newEvent = {
      start: selectedDate.toISOString(),
      end: endDate.toISOString(),
      nome: cliente.nome,
      cognome: cliente.cognome,
      serviziId: [servizio.id],
    };

    postEvent(newEvent);

    onClose();
  };

  return (
    <Drawer anchor="right" open={true} onClose={onClose}>
      <div>
        <Typography variant="h6">Aggiungi Evento</Typography>

        <FormControl fullWidth>
          <InputLabel>Data d'inizio</InputLabel>
          <Datetime
            value={selectedDate}
            onChange={(date) => setSelectedDate(date.toDate())}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="cliente-label">Cliente</InputLabel>
          <Select
            labelId="cliente-label"
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          >
            {clienti &&
              clienti.map((cliente) => (
                <MenuItem key={cliente.id} value={cliente}>
                  {cliente.nome} {cliente.cognome}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="servizio-label">Servizio</InputLabel>
          <Select
            labelId="servizio-label"
            id="servizio"
            value={servizio}
            onChange={(e) => setServizio(e.target.value)}
          >
            {servizi &&
              servizi.map((servizio) => (
                <MenuItem key={servizio.id} value={servizio}>
                  {servizio.nome}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          label="Durata del Servizio (minuti)"
          type="number"
          value={durataServizio}
          onChange={(e) => setDurataServizio(e.target.value)}
        />

        <Button variant="contained" onClick={handleAddEvent}>
          Aggiungi Evento
        </Button>
      </div>
    </Drawer>
  );
};

export default AddEvent;
