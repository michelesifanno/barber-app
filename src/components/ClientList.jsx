import { useState, useEffect } from "react";
import {
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import getClienti from "../utils/getClienti";
import { Link } from "react-router-dom";
import deleteClient from "../utils/deleteClienti";
import { DataGrid } from '@mui/x-data-grid';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function ClientList() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    data: responseData,
    error: clientiError,
    loading: clientiLoading,
  } = getClienti();

  useEffect(() => {
    if (responseData?.data) {
      setClienti(responseData.data);
    }
  }, [responseData]);


  const [clienti, setClienti] = useState([]);


  const handleEdit = async (clientId) => {
    console.log(`Modifica del cliente con ID: ${clientId}`);
  };


  const handleDelete = async (clientId) => {
    console.log(`Cancellazione del cliente con ID: ${clientId}`);
    try {
      await deleteClient(clientId);

      setSnackbarOpen(true);
      // Esegui il refetch della lista dei clienti per ottenere la versione aggiornata


    } catch (error) {
      console.error(error);
      alert('Errore durante la richiesta API');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const rows = clienti.map((cliente) => ({
    id: cliente.id.toString(),
    nome: cliente.nome,
    cognome: cliente.cognome,
    lavoro: cliente.lavoro,
    telefono: cliente.telefono,
    azione: '',
  }));

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'nome', headerName: 'Nome', flex: 0.2 },
    { field: 'cognome', headerName: 'Cognome', flex: 0.2 },
    { field: 'lavoro', headerName: 'Lavoro', flex: 0.2 },
    { field: 'telefono', headerName: 'Nr. di telefono', flex: 0.2 },
    {
      field: 'azione', headerName: 'Azioni', flex: 0.2, renderCell: (params) => (
        <div>
          <IconButton>
            <Link to={`/cliente/${params.row.id}`} className="AzioneIcon">
              <VisibilityTwoToneIcon />
            </Link>
          </IconButton>

          <IconButton>
            <a
              href={`https://wa.me/${params.row.telefono}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{color:"rgba(0, 0, 0, 0.54)"}}
            >
              <WhatsAppIcon />
            </a>
          </IconButton>

          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteTwoToneIcon sx={{color:"rgba(0, 0, 0, 0.54)"}}/>
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="BoxStyle">
      {clientiLoading && <p>Caricamento lista clienti...</p>}
      {clientiError && <p>Errore: {clientiError}</p>}
      {Array.isArray(clienti) && clienti.length > 0 ? (
        <DataGrid
          stickyHeader
          rows={rows}
          columns={columns}
          pageSize={10}
        />
      ) : (
        <p>Lista clienti non disponibile o vuota.</p>
      )}

      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
        Cliente eliminato con successo! Aggiorna la pagina per vedere la lista aggiornata!
        </Alert>
      </Snackbar>

    </div>
  );
}

export default ClientList;