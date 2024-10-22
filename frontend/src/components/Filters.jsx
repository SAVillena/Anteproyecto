// import React from 'react';

// function Filtros({ onAplicarFiltros }) {
//     const manejarEnvio = (evento) => {
//         evento.preventDefault(); // Evitar recarga de la página
//         onAplicarFiltros(); // Llamar a la función pasada desde Home.jsx
//     };

//     return (
//         <>
//         <form onSubmit={manejarEnvio}>
//             <label htmlFor="fecha">Fecha:</label>
//             <input type="date" id="fecha" name="fecha" />

//             <label htmlFor="hora">Hora:</label>
//             <input type="time" id="hora" name="hora" />

//             <label htmlFor="sensor">Sensor:</label>
//             <select id="sensor" name="sensor">
//                 <option value="sensor1">Sensor 1</option>
//                 <option value="sensor2">Sensor 2</option>
//                 <option value="sensor3">Sensor 3</option>
//             </select>

//             <label htmlFor="metrica">Métrica:</label>
//             <select id="metrica" name="metrica">
//                 <option value="pm2.5">PM2.5</option>
//                 <option value="pm10">PM10</option>
//             </select>

//             <button type="submit">Filtrar</button>
//         </form>
//         </>

//     );
// }

// export default Filtros;

import React, { useState } from 'react';
import { Box, Typography, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';

function Filtros({ onAplicarFiltros }) {
    const [filtroSeleccionado, setFiltroSeleccionado] = useState('');

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        onAplicarFiltros();
    };

    const handleSelectChange = (e) => {
        setFiltroSeleccionado(e.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Sección 1: Filtros */}
            <Box sx={{ flex: 1, padding: 2 }}>
                <form
                    onSubmit={manejarEnvio}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        alignItems: 'flex-start',
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="filtro-label">Selecciona un filtro</InputLabel>
                        <Select
                            labelId="filtro-label"
                            value={filtroSeleccionado}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="fecha">Fecha</MenuItem>
                            <MenuItem value="sensor">Sensor</MenuItem>
                            <MenuItem value="metrica">Métrica</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Render Condicional según el Filtro Seleccionado */}
                    {filtroSeleccionado === 'fecha' && (
                        <FormControl fullWidth>
                            <InputLabel htmlFor="fechaInput"></InputLabel>
                            <input
                                type="date"
                                id="fechaInput"
                                name="fecha"
                                style={{ width: '100%' }}
                            />
                        </FormControl>
                    )}

                    {filtroSeleccionado === 'sensor' && (
                        <FormControl fullWidth>
                            <InputLabel htmlFor="sensorInput">Sensor</InputLabel>
                            <Select id="sensorInput" name="sensor">
                                <MenuItem value="sensor1">Sensor 1</MenuItem>
                                <MenuItem value="sensor2">Sensor 2</MenuItem>
                                <MenuItem value="sensor3">Sensor 3</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {filtroSeleccionado === 'metrica' && (
                        <FormControl fullWidth>
                            <InputLabel htmlFor="metricaInput">Métrica</InputLabel>
                            <Select id="metricaInput" name="metrica">
                                <MenuItem value="pm2.5">PM2.5</MenuItem>
                                <MenuItem value="pm10">PM10</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    <Button type="submit" variant="contained" sx={{ alignSelf: 'center' }}>
                        Filtrar
                    </Button>
                </form>
            </Box>

            {/* Sección 2
            <Box sx={{ flex: 1, padding: 2, borderTop: '1px solid #ddd' }}>
                <Typography variant="h6">Sección 2</Typography>
            </Box>

            {/* Sección 3 
            <Box sx={{ flex: 1, padding: 2, borderTop: '1px solid #ddd' }}>
                <Typography variant="h6">Sección 3</Typography>
            </Box> */}
        </Box>
    );
}

export default Filtros;


