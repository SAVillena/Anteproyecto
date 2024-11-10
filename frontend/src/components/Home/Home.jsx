// src/components/Home.jsx

import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Fab, Badge } from '@mui/material';
import EmbeddedPage from '../iframe';
import Filtros from '../Filters';
import Graficos from '../Graphics';
import Alerta from '../Alert';
import Drawer from '../DrawerManagement/Drawer';
import CamionIcon from '../../images/camion.png';
import { obtenerCamiones } from '../../services/truck.service';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Home.css';
import { fetchFilteredData } from '../../services/graphic.service';

const Home = () => {
    const [chartData, setChartData] = useState(null);
    const [filtros, setFiltros] = useState({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [trucks, setTrucks] = useState([]);
    const [hasAlert, setHasAlert] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)'); // Detectar si es un dispositivo móvil

    const fetchTrucks = async () => {
        try {
            const data = await obtenerCamiones();
            setTrucks(data);
            checkAlerts(data);
        } catch (error) {
            console.error('Error fetching trucks:', error);
        }
    };

    useEffect(() => {
        fetchTrucks();
    }, []);

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    const checkAlerts = (trucks) => {
        const alert = trucks.some((truck) => truck.porcentajeAgua <= 10);
        setHasAlert(alert);
    };

    const manejarFiltrosAplicados = async (filtros) => {
        try {
            const data = await fetchFilteredData(filtros);
            // Procesar los datos para mostrarlos en el gráfico
            setChartData(data);
            setShowGraphs(true);
            setFiltros(filtros);
        } catch (error) {
            console.error('Error al aplicar filtros:', error);
        }
    };    

    return (
        <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column', padding: 2, gap: 2 }}>
            {isMobile ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 2,
                            borderRadius: '12px',
                            border: '1px solid cyan',
                            height: '39vh', // Ocupa al menos la mitad de la pantalla
                        }}
                    >
                        <EmbeddedPage />
                    </Paper>
                    <Paper elevation={3} sx={{ padding: 2, borderRadius: '12px', border: '1px solid cyan' }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Gráficos</Typography>
                        {showGraphs && <Graficos />}
                    </Paper>
                    <Paper elevation={3} sx={{ padding: 2, borderRadius: '12px', border: '1px solid cyan' }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Alertas</Typography>
                        <Alerta />
                    </Paper>
                </Box>
            ) : (
                <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
                    {/* Vista de escritorio: Se muestran todos los componentes, incluido Filtros */}
                    <Box component="aside" sx={{ width: '20%', padding: 2, overflow: 'auto' }}>
                        <Paper elevation={3} sx={{ height: '99%', padding: 3, borderRadius: '12px', border: '1px solid cyan' }}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Filtros</Typography>
                            <Filtros onAplicarFiltros={manejarFiltrosAplicados} />

                        </Paper>
                    </Box>
                    <Box sx={{ width: '80%', padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Grid container spacing={2} sx={{ height: '100%' }}>
                            <Grid item xs={12} md={8} sx={{ height: '90vh' }}>
                                <Paper elevation={3} sx={{ height: '100%', overflow: 'hidden', borderRadius: '12px', border: '1px solid cyan' }}>
                                    <EmbeddedPage />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{ height: '90vh', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Paper elevation={3} sx={{ flex: 1, padding: 3, borderRadius: '12px', display: 'flex', flexDirection: 'column', border: '1px solid cyan' }}>
                                    <Typography variant="h6" sx={{ marginBottom: 2 }}>Gráficos</Typography>
                                    {chartData && <Graficos data={chartData} filter={filtros} />}
                                </Paper>
                                <Paper elevation={3} sx={{ flex: 1, padding: 3, borderRadius: '12px', display: 'flex', flexDirection: 'column', border: '1px solid cyan' }}>
                                    <Typography variant="h6" sx={{ marginBottom: 2 }}>Alertas</Typography>
                                    <Alerta />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}

            <Fab
                color="primary"
                aria-label="chat"
                onClick={() => {
                    toggleDrawer(true)();
                    setHasAlert(false);
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
                    invisible={!hasAlert}
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

            <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)} camiones={trucks} />
        </Box>
    );
};

export default Home;
