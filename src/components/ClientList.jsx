import React, { useState, useEffect } from "react";
import {
  IconButton,
} from "@mui/material";
import getClienti from "../utils/getClienti";
import { DataGrid } from '@mui/x-data-grid';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function ClientList() {
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

  
  const handleDelete = async (clientId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clienti/${clientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        alert(error.errorMessage || 'Errore durante la richiesta API');
        return;
      }
  
      console.log('Cliente rimosso con successo!');
      // Aggiorna la lista dei clienti dopo la rimozione
      const updatedClientiResponse = await getClienti();
      if (updatedClientiResponse?.data) {
        setClienti(updatedClientiResponse.data);
      }
    } catch (error) {
      console.error(error);
      alert('Errore durante la richiesta API');
    }
  };
      

  const handleEdit = (clientId) => {
    // Implementa la logica per la modifica del cliente
    console.log(`Modifica del cliente con ID: ${clientId}`);
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
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <WhatsAppIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditTwoToneIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteTwoToneIcon />
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
    </div>
  );
}

export default ClientList;
