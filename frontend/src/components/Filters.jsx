import React, { useState } from 'react';
import {
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    TextField
} from '@mui/material';

function Filtros({ onAplicarFiltros }) {
    const [filtroSeleccionado, setFiltroSeleccionado] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sensor, setSensor] = useState('');
    const [metrica, setMetrica] = useState('');

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        // Solo envía los valores del filtro seleccionado
        const filtros = {};
        if (filtroSeleccionado === 'fecha') {
            filtros.startDate = startDate;
            filtros.endDate = endDate;
        } else if (filtroSeleccionado === 'sensor') {
            filtros.sensor = sensor;
        } else if (filtroSeleccionado === 'metrica') {
            filtros.metric = metrica;
        }
        onAplicarFiltros(filtros);
    };

    const handleSelectChange = (e) => {
        const selectedFilter = e.target.value;
        setFiltroSeleccionado(selectedFilter);

        // Limpia los otros filtros al cambiar el filtro principal
        setStartDate('');
        setEndDate('');
        setSensor('');
        setMetrica('');
    };

    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    const handleSensorChange = (e) => setSensor(e.target.value);
    const handleMetricaChange = (e) => setMetrica(e.target.value);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: 1, padding: 2 }}>
                <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                    <FormControl fullWidth>
                        <InputLabel id="filtro-label">Selecciona un filtro</InputLabel>
                        <Select labelId="filtro-label" value={filtroSeleccionado} onChange={handleSelectChange}>
                            <MenuItem value="fecha">Fecha</MenuItem>
                            <MenuItem value="sensor">Sensor</MenuItem>
                            <MenuItem value="metrica">Métrica</MenuItem>
                        </Select>
                    </FormControl>

                    {filtroSeleccionado === 'fecha' && (
                        <>
                            <TextField
                                label="Fecha Inicio"
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                            <TextField
                                label="Fecha Fin"
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        </>
                    )}
                    {filtroSeleccionado === 'sensor' && (
                        <FormControl fullWidth>
                            <InputLabel htmlFor="sensorInput"></InputLabel>
                            <TextField
                                id="sensor"
                                label="Ingrese la ID del sensor"
                                variant="filled"
                                value={sensor} // Vincula el valor al estado sensorId
                                onChange={handleSensorChange} // Actualiza el estado con el valor ingresado
                            />
                        </FormControl>
                    )}
                    {filtroSeleccionado === 'metrica' && (
                        <FormControl fullWidth>
                            <InputLabel htmlFor="metricaInput">Métrica</InputLabel>
                            <Select id="metricaInput" value={metrica} onChange={handleMetricaChange}>
                                <MenuItem value="PM2.5">PM2.5</MenuItem>
                                <MenuItem value="PM10">PM10</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                    <Button type="submit" variant="contained" sx={{ alignSelf: 'center' }}>
                        Filtrar
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default Filtros;
