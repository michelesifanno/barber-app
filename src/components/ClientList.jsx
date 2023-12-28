import React, { useState, useEffect } from "react";
import {
  IconButton,
} from "@mui/material";
import getClienti from "../utils/getClienti";
import { DataGrid } from '@mui/x-data-grid';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


function ClientList () {
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
          )
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
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25]}
          />
        ) : (
          <p>Lista clienti non disponibile o vuota.</p>
        )}
      </div>

    )
}


export default ClientList;