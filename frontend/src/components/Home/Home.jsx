import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Fab, Badge } from '@mui/material';
import EmbeddedPage from '../iframe';
import Filtros from '../Filters';
import Graficos from '../Graphics';
import Alerta from '../Alert';
import Dwr from '../DrawerManagement/Drawer';
import CamionIcon from '../../images/camion.png';
import { obtenerCamiones } from '../../services/truck.service';

function Home() {
    const [mostrarGraficos, setMostrarGraficos] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cantidadCamiones, setCamiones] = useState([]);
    const [hayAlerta, setHayAlerta] = useState(false);

    const manejarFiltrosAplicados = () => {
        setMostrarGraficos(true);
    };

    useEffect(() => {
        const fetchCamiones = async () => {
            const datos = await obtenerCamiones();
            setCamiones(datos);
            verificarAlerta(datos);
        };
        fetchCamiones();
    }, []);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const verificarAlerta = (camiones) => {
        const alerta = camiones.some((camion) => camion.porcentajeAgua <= 10);
        setHayAlerta(alerta);
    };

    return (
        <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column', padding: 2, gap: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', flexGrow: 1, gap: 2 }}>
                <Box
                    component="aside"
                    sx={{
                        width: '20%',
                        padding: 2,
                        overflow: 'auto',
                    }}
                >
                    <Paper elevation={3} sx={{ height: '99%', padding: 3, borderRadius: '12px', border: '1px solid cyan' }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Filtros</Typography>
                        <Filtros onAplicarFiltros={manejarFiltrosAplicados} />
                    </Paper>
                </Box>

                {/* Citysense */}
                <Box sx={{ width: '80%', padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Grid container spacing={2} sx={{ height: '100%' }}>
                        <Grid item xs={12} md={8} sx={{ height: '90vh' }}>
                            <Paper elevation={3} sx={{ height: '100%', overflow: 'hidden', borderRadius: '12px', border: '1px solid cyan' }}>
                                <EmbeddedPage />
                            </Paper>
                        </Grid>
                        {/* Gráficos */}
                        <Grid item xs={12} md={4} sx={{ height: '90vh', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Paper elevation={3} sx={{ flex: 1, padding: 3, borderRadius: '12px', display: 'flex', flexDirection: 'column', border: '1px solid cyan' }}>
                                <Typography variant="h6" sx={{ marginBottom: 2 }}>Gráficos</Typography>
                                {mostrarGraficos && <Graficos />}
                            </Paper>
                            {/* alertas */}
                            <Paper elevation={3} sx={{ flex: 1, padding: 3, borderRadius: '12px', display: 'flex', flexDirection: 'column', border: '1px solid cyan' }}>
                                <Typography variant="h6" sx={{ marginBottom: 2 }}>Alertas</Typography>
                                <Alerta />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/* Botón flotante en la esquina inferior derecha */}
            <Fab
                color="primary"
                aria-label="chat"
                onClick={() => {
                    toggleDrawer(true)();
                    setHayAlerta(false);
                }}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Badge
                    color="error"
                    variant="dot"
                    invisible={!hayAlerta}
                    overlap="circular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    sx={{
                        '& .MuiBadge-dot': {
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            top: -4,
                            right: -4,
                            border: '2px solid white',
                            position: 'absolute',
                        },
                    }}
                />
                <img
                    src={CamionIcon}
                    alt="CamionIcon"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
            </Fab>

            {/* Drawer desde archivo externo */}
            <Dwr
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                camiones={cantidadCamiones}
            />
        </Box>
    );
}

export default Home;
