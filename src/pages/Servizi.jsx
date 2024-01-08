import {
  Box,
  Grid,
  Typography
} from "@mui/material";
import AddService from "../components/AddService";
import ServiceList from "../components/ServiceList";

function Servizi() {


  return (
    <>
      <Box>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={9}>
            <Typography variant="h4" gutterBottom mx={[0]} my={[0]}>
              Servizi
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <AddService />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ py: [2], minHeight: '100vh' }}>
      <p>
              Clicca sull'intestazione per ordinare la tabella o sul relativo menu per attivare i filtri.
            </p>
            <ServiceList />
      </Box>
    </>
  );
}

export default Servizi;