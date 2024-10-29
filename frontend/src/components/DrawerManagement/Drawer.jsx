import React from 'react';
import { Drawer, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import CamionIcon from '../../images/camion.png'; // Imagen del camión

function Dwr({ open, onClose, camiones }) {
    const filtroColor = (porcentaje) => {
        const nivelGris = 100 - porcentaje;
        return `grayscale(${nivelGris}%)`;
    };

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    height: '43vh', // Ocupa menos de la mitad de la pantalla
                    overflow: 'auto', // Habilita el desplazamiento
                },
            }}
        >
            <Box
                sx={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    Gestión de Camiones
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                    {camiones.map((camion) => (
                        <Grid item xs={1.6} key={camion.id}> {/* Cambiado a xs={1.5} para 8 elementos por fila */}
                            <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                    src={CamionIcon}
                                    alt={`Camión ${camion.id}`}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        filter: filtroColor(camion.porcentajeAgua),
                                        marginRight: 2,
                                    }}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6">Camión {camion.id}</Typography>
                                    <Typography variant="body2">Conductor: {camion.conductor}</Typography>
                                    <Typography variant="body2">Inicio: {camion.horaInicio}</Typography>
                                    <Typography variant="body2">Agua: {camion.porcentajeAgua}%</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Drawer>
    );
}

export default Dwr;
