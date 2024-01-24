import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";
import getCliente from "../utils/getCliente";
import usePutCliente from "../utils/putCliente";

function Cliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: responseData, error: clientiError, loading: clientiLoading } = getCliente(id);
  const { putCliente, loading: putClienteLoading, error: putClienteError, response: putClienteResponse } = usePutCliente();

  useEffect(() => {
    if (responseData?.data) {
      setCliente(responseData.data);
    }
  }, [responseData]);

  useEffect(() => {

    if (putClienteResponse) {

    }
  }, [putClienteResponse]);

  const handleEditModeToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleUpdateCliente = async () => {
    putCliente(id, cliente);
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  return (
    <>
      <Box>
        {/* Visualizzazione informazioni cliente */}
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom mx={[0]} my={[0]}>
              {cliente.nome} {cliente.cognome}
            </Typography>
            <Typography variant="h6" gutterBottom mx={[0]} my={[0]}>
              {cliente.lavoro}
            </Typography>
            <Typography variant="h6" gutterBottom mx={[0]} my={[0]}>
              {cliente.telefono}
            </Typography>
          </Grid>
        </Grid>

        {/* Pulsante di modifica */}
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {!isEditMode ? (
              <Button variant="contained" onClick={handleEditModeToggle}>
                Modifica
              </Button>
            ) : (
              <Button variant="contained" onClick={handleUpdateCliente} disabled={putClienteLoading}>
                Salva Modifiche
              </Button>
            )}
          </Grid>
        </Grid>

        {/* Modifica dati cliente */}
        {isEditMode && (
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <input
                type="text"
                name="nome"
                value={cliente.nome}
                onChange={handleChange}
                placeholder="Nome"
              />
              <input
                type="text"
                name="cognome"
                value={cliente.cognome}
                onChange={handleChange}
                placeholder="Cognome"
              />
              <input
                type="text"
                name="lavoro"
                value={cliente.lavoro}
                onChange={handleChange}
                placeholder="Lavoro"
              />
              <input
                type="text"
                name="telefono"
                value={cliente.telefono}
                onChange={handleChange}
                placeholder="Telefono"
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default Cliente;
