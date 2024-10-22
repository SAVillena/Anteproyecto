import React, { useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import EmbeddedPage from '../iframe';
import Filtros from '../Filters';
import Graficos from '../Graphics';
import Alerta from '../Alert';

function Home() {
    const [mostrarGraficos, setMostrarGraficos] = useState(false); // Estado para controlar la visibilidad de gráficos

    const manejarFiltrosAplicados = () => {
        setMostrarGraficos(true); // Activamos los gráficos al aplicar filtros
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', flexGrow: 1 }}>
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
                        <Filtros onAplicarFiltros={manejarFiltrosAplicados} /> {/* Pasamos la función al componente Filtros */}
                    </Paper>
                </Box>

                {/* Citysense */}
                <Box sx={{ width: '80%', padding: 2, display: 'flex', flexDirection: 'column' }}>
                    <Grid container spacing={2} sx={{ height: '100%' }}>
                        <Grid item xs={12} md={8} sx={{ height: '90vh' }}>
                            <Paper elevation={3} sx={{ height: '100%', overflow: 'hidden' }}>
                                <EmbeddedPage />
                            </Paper>
                        </Grid>
                        {/* Gráficos */}
                        <Grid item xs={12} md={4} sx={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Paper elevation={3} sx={{ flex: 1, marginBottom: 2, padding: 2 }}>
                                <Typography variant="h6">Gráficos</Typography>
                                {mostrarGraficos && <Graficos />} {/* Renderizamos los gráficos solo si se han aplicado filtros */}
                            </Paper>
                        {/* alertas */}
                            <Paper elevation={3} sx={{ flex: 1, padding: 2 }}>
                                <Typography variant="h6">Alertas</Typography>
                                <Alerta />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;