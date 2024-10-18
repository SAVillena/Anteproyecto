import React from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Paper } from '@mui/material';
import EmbeddedPage from '../iframe';
import Graficos from '../Graphics';
import Alerta from '../Alert';
import Filtros from '../Filters';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Home() {
    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', flexGrow: 1 }}>
                {/* Filtros (Sidebar) */}
                <Box
                    component="aside"
                    sx={{
                        width: '20%',
                        padding: 2,
                        height: '90vh',
                        overflow: 'auto',
                    }}
                >
                    <Paper elevation={3} sx={{ height: '100%', padding: 2 }}>
                        <Typography variant="h6">Filtros</Typography>
                        {/* Contenido adicional de Filtros */}
                        <Filtros />
                    </Paper>
                </Box>

                {/* Main Content */}
                <Box sx={{ width: '80%', padding: 2, display: 'flex', flexDirection: 'column' }}>
                    <Grid container spacing={2} sx={{ height: '100%' }}>
                        {/* CitySense (Left Pane) */}
                        <Grid item xs={12} md={8} sx={{ height: '90vh' }}>
                            <Paper elevation={3} sx={{ height: '100%', overflow: 'hidden' }}>
                                <EmbeddedPage />
                            </Paper>
                        </Grid>

                        {/* Gráficos y Alertas (Right Pane) */}
                        <Grid item xs={12} md={4} sx={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            {/* Gráficos */}
                            <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', marginBottom: 2 }}>
                            <Typography variant="h6">Graficos</Typography>
                                <Graficos />
                            </Paper>

                            {/* Alertas */}
                            <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflow: 'auto', padding: 2 }}>
                                {/* Alertas se muestran abajo */}
                                <Typography variant="h6">Alertas</Typography>
                                <Alerta />
                                <Alert variant="filled" severity="error">
                                    <AlertTitle>Advertencia</AlertTitle>
                                    Urgente, regar sector de inmediato
                                </Alert>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;
