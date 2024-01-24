import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";
import getServizio from "../utils/getServizio";
import usePutServizio from "../utils/putServizio";

function Servizio() {
  const { id } = useParams();
  const [servizio, setServizio] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: responseData, error: serviziError, loading: serviziLoading } = getServizio(id);
  const { putServizio, loading: putServizioLoading, error: putServizioError, response: putServizioResponse } = usePutServizio();

  useEffect(() => {
    if (responseData?.data) {
      setServizio(responseData.data);
    }
  }, [responseData]);

  useEffect(() => {

    if (putServizioResponse) {

    }
  }, [putServizioResponse]);

  const handleEditModeToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleUpdateServizio= async () => {
    putServizio(id, servizio);
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServizio((prevServizio) => ({
      ...prevServizio,
      [name]: value,
    }));
  };

  return (
    <>
      <Box>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom mx={[0]} my={[0]}>
              {servizio.nome}
            </Typography>
            <Typography variant="h6" gutterBottom mx={[0]} my={[0]}>
              € {servizio.prezzo}
            </Typography>
            <Typography variant="h6" gutterBottom mx={[0]} my={[0]}>
              {servizio.durata} min.
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
              <Button variant="contained" onClick={handleUpdateServizio} disabled={putServizioLoading}>
                Salva Modifiche
              </Button>
            )}
          </Grid>
        </Grid>

        {isEditMode && (
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <input
                type="text"
                name="nome"
                value={servizio.nome}
                onChange={handleChange}
                placeholder="Nome"
              />
              <input
                type="text"
                name="prezzo"
                value={servizio.prezzo}
                onChange={handleChange}
                placeholder="Prezzo"
              />
              <input
                type="text"
                name="durata"
                value={servizio.durata}
                onChange={handleChange}
                placeholder="Durata"
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default Servizio;
