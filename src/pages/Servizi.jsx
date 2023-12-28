import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Grid,
  Typography
} from "@mui/material";
import getServizi from "../utils/getServizi";
import { DataGrid } from '@mui/x-data-grid';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AddService from "../components/AddService";



function Servizi() {

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
    prezzo: servizio.prezzo,
    durata: servizio.durata,
    azione: '',
  }));



  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'nome', headerName: 'Nome', flex: 0.2 },
    { field: 'prezzo', headerName: 'Prezzo (€)', flex: 0.2 },
    { field: 'durata', headerName: 'Durata (min.)', flex: 0.2 },
    {
      field: 'azione', headerName: 'Azioni', flex: 0.1, renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditTwoToneIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteTwoToneIcon />
          </IconButton>
        </div>
      )
    },
  ];


  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Typography variant="h4" gutterBottom>
              Servizi
            </Typography>
            <p>
              Lista di tutti i servizi.
            </p>
          </Grid>
          <Grid item xs={3}>
          <AddService  />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ py:[2]}}>
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
              </div>
      </Box>
    </>
  );
}

export default Servizi;