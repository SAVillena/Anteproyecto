import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, TextField, Button, Alert, Grid, useTheme, Snackbar } from '@mui/material';
import { fetchFilteredAlerts } from '../../services/alert.service';

function GridLayout() {
    const theme = useTheme();
    const [filteredAlerts, setFilteredAlerts] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
    });
    const [filters, setFilters] = useState({
        alertType: '',
        dateFrom: '',
        dateTo: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = async () => {
        const today = new Date().toISOString().split('T')[0]; // Obtiene el día actual en formato YYYY-MM-DD

        // Validaciones de fechas
        if (filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo) {
            setSnackbar({
                open: true,
                message: 'La fecha "Desde" no puede ser mayor que la fecha "Hasta".',
            });
            return;
        }

        if (filters.dateTo && filters.dateTo > today) {
            setSnackbar({
                open: true,
                message: 'La fecha "Hasta" no puede ser mayor que el día actual.',
            });
            return;
        }

        try {
            const response = await fetchFilteredAlerts(filters);
            console.log('Datos devueltos por fetchFilteredAlerts:', response);

            // Aseguramos que se extrae solo el array de alertas de la respuesta
            if (response && response.state === 'Success' && Array.isArray(response.data)) {
                setFilteredAlerts(response.data); // Asigna el array de alertas
            } else {
                setFilteredAlerts([]); // Si no hay datos válidos, inicializamos como array vacío
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Error al aplicar los filtros. Por favor, inténtalo nuevamente.',
            });
            console.error('Error al aplicar los filtros:', error);
        }
    };


    const getAlertSeverity = (type) => {
        return type.includes('Precaucion') ? 'warning' : 'error';
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            // Evita cerrar el Snackbar si el usuario hace clic fuera de él
            return;
        }
        setSnackbar({ open: false, message: '' });
    };

    const alertsPM25 = filteredAlerts.filter(alert => alert.alert_type.includes('PM2.5'));
    const alertsPM10 = filteredAlerts.filter(alert => alert.alert_type.includes('PM10'));

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(5, 1fr)' }, // Una columna en móviles, diseño original en escritorio
                gridTemplateRows: { xs: 'auto', md: 'repeat(5, 1fr)' },
                gap: '16px',
                height: { xs: 'auto', md: '92vh' }, // Altura automática en móviles
                padding: '16px',
            }}
        >
            {/* Sección de Filtros */}
            <Box
                sx={{
                    gridColumn: { xs: '1 / span 1', md: 'span 1 / span 1' },
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: theme.shadows[3],
                    border: '1px solid cyan',
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: '24px', fontSize: { xs: '18px', md: '24px' } }}>
                    Filtros
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '8px', fontSize: { xs: '16px', md: '20px' } }}>
                    Filtrar por:
                </Typography>
                <Select
                    name="alertType"
                    value={filters.alertType}
                    onChange={handleFilterChange}
                    fullWidth
                    sx={{ marginBottom: '24px' }}
                >
                    <MenuItem value="Ambos">Todos los Tipos</MenuItem>
                    <MenuItem value="Precaucion, PM2.5">Precaucion PM2.5</MenuItem>
                    <MenuItem value="Urgente, PM2.5">Urgente PM2.5</MenuItem>
                    <MenuItem value="Precaucion, PM10">Precaucion PM10</MenuItem>
                    <MenuItem value="Urgente, PM10">Urgente PM10</MenuItem>
                </Select>

                <TextField
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                    label="Fecha (DD-MM-AAAA) Desde"
                    type="date"
                    fullWidth
                    sx={{ marginBottom: '24px' }}
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleFilterChange}
                    label="Fecha (DD-MM-AAAA) Hasta"
                    type="date"
                    fullWidth
                    sx={{ marginBottom: '24px' }}
                    InputLabelProps={{ shrink: true }}
                />

                <Button variant="contained" color="primary" fullWidth onClick={applyFilters} sx={{ marginTop: '16px' }}>
                    Aplicar Filtros
                </Button>
            </Box>

            {/* Alertas PM2.5 */}
            <Box
                sx={{
                    gridColumn: { xs: '1 / span 1', md: 'span 2 / span 2' },
                    gridRow: { xs: 'auto', md: 'span 5 / span 5' },
                    backgroundColor: theme.palette.background.paper,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    padding: '16px',
                    color: theme.palette.text.primary,
                    borderRadius: '8px',
                    boxShadow: theme.shadows[3],
                    border: '1px solid cyan',
                    overflowY: 'auto',
                    maxHeight: { xs: 'auto', md: '100%' },
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: '16px', fontSize: { xs: '18px', md: '24px' } }}>
                    Alertas PM2.5
                </Typography>
                <Grid container spacing={2}>
                    {alertsPM25.map((alert) => (
                        <Grid item xs={12} key={alert.id}>
                            <Alert severity={getAlertSeverity(alert.alert_type)} sx={{ padding: '8px', borderRadius: '8px' }}>
                                <Typography variant="h6" sx={{ marginBottom: '8px', fontSize: { xs: '16px', md: '20px' } }}>
                                    {alert.alert_type}
                                </Typography>
                                <Typography sx={{ marginBottom: '4px' }}>Valor: {alert.alert_value}</Typography>
                                <Typography sx={{ marginBottom: '4px' }}>ID del Sensor: {alert.serialId}</Typography>
                                <Typography>Fecha y Hora: {new Date(alert.timestamp).toLocaleString()}</Typography>
                            </Alert>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Alertas PM10 */}
            <Box
                sx={{
                    gridColumn: { xs: '1 / span 1', md: '4 / span 2' },
                    gridRow: { xs: 'auto', md: 'span 5 / span 5' },
                    backgroundColor: theme.palette.background.paper,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    padding: '16px',
                    color: theme.palette.text.primary,
                    borderRadius: '8px',
                    boxShadow: theme.shadows[3],
                    border: '1px solid cyan',
                    overflowY: 'auto',
                    maxHeight: { xs: 'auto', md: '100%' },
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: '16px', fontSize: { xs: '18px', md: '24px' } }}>
                    Alertas PM10
                </Typography>
                <Grid container spacing={2}>
                    {alertsPM10.map((alert) => (
                        <Grid item xs={12} key={alert.id}>
                            <Alert severity={getAlertSeverity(alert.alert_type)} sx={{ padding: '8px', borderRadius: '8px' }}>
                                <Typography variant="h6" sx={{ marginBottom: '8px', fontSize: { xs: '16px', md: '20px' } }}>
                                    {alert.alert_type}
                                </Typography>
                                <Typography sx={{ marginBottom: '4px' }}>Valor: {alert.alert_value}</Typography>
                                <Typography sx={{ marginBottom: '4px' }}>ID del Sensor: {alert.serialId}</Typography>
                                <Typography>Fecha y Hora: {new Date(alert.timestamp).toLocaleString()}</Typography>
                            </Alert>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Snackbar para mostrar mensajes */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                action={
                    <Button color="secondary" size="small" onClick={handleSnackbarClose}>
                        CERRAR
                    </Button>
                }
            />
        </Box>
    );
}

export default GridLayout;
