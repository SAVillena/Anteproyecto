import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, TextField, Button, Alert, Grid } from '@mui/material';


const mockData = [
    {
        id: 1,
        timestamp: '2024-10-22T10:00:00Z',
        alert_type: 'Precaucion PM2.5',
        alert_value: 35.5,
        serialId: 101,
    },
    {
        id: 2,
        timestamp: '2024-10-22T12:00:00Z',
        alert_type: 'Urgente PM2.5',
        alert_value: 75.3,
        serialId: 102,
    },
    {
        id: 3,
        timestamp: '2024-10-22T14:00:00Z',
        alert_type: 'Precaucion PM10',
        alert_value: 40.0,
        serialId: 101,
    },
    {
        id: 4,
        timestamp: '2024-10-22T16:00:00Z',
        alert_type: 'Urgente PM10',
        alert_value: 85.1,
        serialId: 103,
    },
];

function GridLayout() {
    const [filteredAlerts, setFilteredAlerts] = useState(mockData);
    const [filters, setFilters] = useState({
        alertType: '',
        serialId: '',
        date: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        let filtered = mockData;

        if (filters.alertType) {
            filtered = filtered.filter(alert => alert.alert_type === filters.alertType);
        }

        if (filters.serialId) {
            filtered = filtered.filter(alert => alert.serialId === parseInt(filters.serialId));
        }

        if (filters.date) {
            filtered = filtered.filter(alert => alert.timestamp.startsWith(filters.date));
        }

        setFilteredAlerts(filtered);
    };

    const getAlertSeverity = (type) => {
        return type.includes('Precaucion') ? 'warning' : 'error';
    };

    const alertsPM25 = filteredAlerts.filter(alert => alert.alert_type.includes('PM2.5'));
    const alertsPM10 = filteredAlerts.filter(alert => alert.alert_type.includes('PM10'));

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, 1fr)',
            gap: '8px',
            height: '92vh',
        }}
        >
            {/* Sección de Filtros */}
            <Box sx={{ backgroundColor: '#333', color: '#fff', padding: '16px' }}>
                <Typography variant="h5">Filtros</Typography>
                <Select
                    name="alertType"
                    value={filters.alertType}
                    onChange={handleFilterChange}
                    fullWidth
                    sx={{ marginBottom: '16px' }}
                >
                    <MenuItem value="all">Todos los Tipos</MenuItem>
                    <MenuItem value="Precaucion">Precaucion</MenuItem>
                    <MenuItem value="Urgente">Urgente</MenuItem>
                </Select>

                <TextField
                    name="serialId"
                    value={filters.serialId}
                    onChange={handleFilterChange}
                    label="Serial ID"
                    fullWidth
                    sx={{ marginBottom: '16px' }}
                />

                <TextField
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    label="Fecha (YYYY-MM-DD)"
                    type="date"
                    fullWidth
                    sx={{ marginBottom: '16px' }}
                    InputLabelProps={{ shrink: true }}
                />

                <Button variant="contained" color="primary" fullWidth onClick={applyFilters}>
                    Aplicar Filtros
                </Button>
            </Box>

            {/* Segunda caja: ocupa 2 columnas y 5 filas */}
            <Box
                sx={{
                    gridColumn: 'span 2 / span 2',
                    backgroundColor: '#333',
                    gridRow: 'span 5 / span 5',
                    display: 'flex',
                    flexDirection: 'column', // Para apilar las alertas verticalmente
                    gap: '8px', // Espacio entre las alertas
                    padding: '16px',
                    color: '#fff',
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: '16px' }}>Alertas PM2.5</Typography>
                <Grid container spacing={2}>
                    {alertsPM25.map((alert) => (
                        <Grid item xs={12} key={alert.id}>
                            <Alert severity={getAlertSeverity(alert.alert_type)}>
                                <Typography variant="h6">{alert.alert_type}</Typography>
                                <Typography>Valor: {alert.alert_value}</Typography>
                                <Typography>ID del Sensor: {alert.serialId}</Typography>
                                <Typography>
                                    Fecha y Hora: {new Date(alert.timestamp).toLocaleString()}
                                </Typography>
                            </Alert>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box
                sx={{
                    gridColumn: '4 / span 2',
                    gridRow: 'span 5 / span 5',
                    backgroundColor: '#333',
                    display: 'flex',
                    flexDirection: 'column', // Para apilar las alertas verticalmente
                    gap: '8px', // Espacio entre las alertas
                    padding: '16px',
                    color: '#fff',
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: '16px' }}>Alertas PM10</Typography>
                <Grid container spacing={2}>
                    {alertsPM10.map((alert) => (
                        <Grid item xs={12} key={alert.id}>
                            <Alert severity={getAlertSeverity(alert.alert_type)}>
                                <Typography variant="h6">{alert.alert_type}</Typography>
                                <Typography>Valor: {alert.alert_value}</Typography>
                                <Typography>ID del Sensor: {alert.serialId}</Typography>
                                <Typography>
                                    Fecha y Hora: {new Date(alert.timestamp).toLocaleString()}
                                </Typography>
                            </Alert>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default GridLayout;
