import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Grid,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import getServizi from "../utils/getServizi";
import deleteService from "../utils/deleteService";
import { DataGrid } from '@mui/x-data-grid';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';



function ServiceList() {

    const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    data: responseData,
    error: serviziError,
    loading: serviziLoading,
  } = getServizi();

  const [servizi, setServizi] = useState([]);

  useEffect(() => {
    if (responseData?.data) {
      setServizi(responseData.data);
    }
  }, [responseData]);



  const rows = servizi.map((servizio) => ({
    id: servizio.id.toString(),
    nome: servizio.nome,
    prezzo: `€ ${servizio.prezzo}`,
    durata: `${servizio.durata} min.`,
    azione: '',
  }));

  const handleDelete = async (serviceId) => {
    console.log(`Cancellazione del servizio con ID: ${serviceId}`);
    try {
      await deleteService(serviceId);

      setSnackbarOpen(true);
      // Esegui il refetch della lista dei servizi per ottenere la versione aggiornata

    } catch (error) {
      console.error(error);
      alert('Errore durante la richiesta API');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'nome', headerName: 'Nome', flex: 0.2 },
    { field: 'prezzo', headerName: 'Prezzo', flex: 0.2 },
    { field: 'durata', headerName: 'Durata', flex: 0.2 },
    {
      field: 'azione', headerName: 'Azioni', flex: 0.1, renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <VisibilityTwoToneIcon />
          </IconButton>

          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteTwoToneIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
          </IconButton>
        </div>
      )
    },
  ];


  return (
        <div className="BoxStyle">
          {serviziLoading && <p>Caricamento lista servizi...</p>}
          {serviziError && <p>Errore: {serviziError}</p>}
          {Array.isArray(servizi) && servizi.length > 0 ? (
            <DataGrid
              stickyHeader
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 25]}
            />
          ) : (
            <p>Lista servizi non disponibile o vuota.</p>
          )}

          <Snackbar
            open={snackbarOpen}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success">
              Servizio eliminato con successo! Aggiorna la pagina per vedere la lista aggiornata!
            </Alert>
          </Snackbar>

        </div>
  );
}

export default ServiceList;