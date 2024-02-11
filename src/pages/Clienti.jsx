import {
  Box,
  Grid,
  Typography
} from "@mui/material";
import AddClient from "../components/AddClient";
import ClientList from "../components/ClientList"
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";



function Clienti() {


  return (
    <>
      <Box>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={9}>
            <Typography variant="h4" gutterBottom mx={[0]} my={[0]} sx={{color:'#222'}}>
              Clienti 
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <AddClient />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ py: [2], minHeight: '100vh' }}>
      <p>
              Clicca sull'intestazione per ordinare la tabella o sul relativo menu per attivare i filtri.
            </p>
            <ClientList />
      </Box>
    </>
  );
}

export default Clienti;