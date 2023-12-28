import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import logo from '../../public/logo.png';
import AddClient from './AddClient';
import AddService from './AddService'

const pages = ['Products', 'Pricing', 'Blog'];

function ResponsiveAppBar() {
  return (
    <AppBar position="block">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md="auto" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={logo} alt="Logo" height={'25px'} />
              </Box>
            </Grid>
            <Grid item xs={12} md="auto" sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' }, // Nascondi i pulsanti su mobile
                  alignItems: 'center',
                }}
              >
                <AddClient />
                <AddService />
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
