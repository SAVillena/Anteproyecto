import React from 'react';
import { Box } from '@mui/material';
import ReactEcharts from 'echarts-for-react';
import { generateBarOptions, generateLineOptions, generateRealTimeLinePM25Options, generateRealTimeLinePM10Options } from '../config/chartOptions';
import { useTheme } from '@mui/material/styles';

const Graficos = ({ data, filter }) => {
    const theme = useTheme();

    // Filtrar los datos de los últimos 5 minutos
    const filterRecentData = (data) => {
        const now = new Date().getTime(); // Obtiene el tiempo actual en milisegundos
        const fiveMinutesAgo = now - 5 * 60 * 1000; // Calcula el tiempo de 5 minutos atrás

        return data.filter(item => {
            const timestamp = new Date(item.timestamp).getTime(); // Convierte el timestamp de cada dato a milisegundos
            return timestamp >= fiveMinutesAgo; // Filtra los datos que están dentro de los últimos 5 minutos
        });
    };

    // Filtrar datos si es necesario (cuando se aplica un filtro)
    const filteredData = filter && filter.metric ? filterRecentData(data) : data;

    let chartOptions;
    // imprimimos el filtro
    console.log('Filtro:', filter);
    // Configurar el gráfico dependiendo de la métrica seleccionada
    if (filter.metric === 'PM2.5' || filter.metric === 'PM10') {
        if (filteredData.length === 0) {
            //devolvemos un mensaje de error si no hay datos
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <p>No hay datos disponibles</p>
                </Box>
            );
        } else {
            chartOptions = generateLineOptions(
                `${filter.metric} en los últimos 5 minutos`,
                filteredData,
                theme,
                (timestamp) => new Date(timestamp).toLocaleString()
            );
        }
    }
    if (filter.real === 'realPM10' || filter.real === 'realPM2.5') {
        // Imprimimos el tamaño de los datos filtrados
        console.log('Datos filtrados:', filteredData.length);
        console.log('Datos:', filteredData);
        if (filteredData.length === 0) {
            //devolvemos un mensaje de error si no hay datos
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <p>No hay datos disponibles</p>
                </Box>
            );
        } else {
            if (filter.real === 'realPM10') {
                chartOptions = generateRealTimeLinePM10Options(
                    `Tiempo real de PM10`,
                    filteredData,
                    theme,
                    (timestamp) => new Date(timestamp).toLocaleString()
                );
            }
            if (filter.real === 'realPM2.5') {
                chartOptions = generateRealTimeLinePM25Options(
                    `Tiempo real de PM2.5`,
                    filteredData,
                    theme,
                    (timestamp) => new Date(timestamp).toLocaleString()
                );
            }

        }
    } else {
        // Si no es una métrica (por ejemplo, mostrar un gráfico de barras)
        const valores = [
            Math.min(...filteredData.map(item => item.ad_2)), // mínimo
            Math.max(...filteredData.map(item => item.ad_2)), // máximo
            filteredData.reduce((sum, item) => sum + item.ad_2, 0) / filteredData.length // promedio
        ];
        chartOptions = generateBarOptions('Datos de PM2.5', valores, theme);
    }

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <ReactEcharts option={chartOptions} style={{ height: '100%', width: '100%' }} />
        </Box>
    );
};

export default Graficos;