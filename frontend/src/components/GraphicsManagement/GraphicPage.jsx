import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Paper, CircularProgress, Alert, Button } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { fetchData } from '../../services/graphic.service';
import { generateBarOptions, generateLineOptions } from '../../config/chartOptions';

function GraphicPage() {
    const theme = useTheme();
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            const data = await fetchData();
            setChartData(data);
            setError(null);
        } catch (err) {
            setError('Hubo un problema al cargar los datos. Intenta de nuevo.');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (error) return (
        <Alert severity="error" sx={{ margin: 2 }}>
            {error}
            <Button onClick={getData} color="inherit" size="small" sx={{ marginLeft: 2 }}>
                Reintentar
            </Button>
        </Alert>
    );

    if (!chartData) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ marginLeft: 2 }}>Cargando datos...</Typography>
        </Box>
    );

    const { min_ad_2, max_ad_2, avg_ad_2, min_ad_3, max_ad_3, avg_ad_3, data } = chartData.data;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        date.setHours(date.getHours() - 3);
        return date.toISOString().slice(11, 16);
    };

    const getFormattedDate = () => {
        const today = new Date();
        return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    };

    return (
        <Box sx={{ padding: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>
            Análisis de Partículas PM2.5 y PM10
        </Typography>
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 4,
                padding: 3,
            }}
        >
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
                <ReactECharts option={generateBarOptions(`Mínimo, Máximo y Promedio de PM 2.5 ${getFormattedDate()}`, [min_ad_2, max_ad_2, avg_ad_2], theme)} />
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
                <ReactECharts option={generateBarOptions('Mínimo, Máximo y Promedio de PM 10', [min_ad_3, max_ad_3, avg_ad_3], theme)} />
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
                <ReactECharts option={generateLineOptions('Serie Temporal de PM2.5', data, theme, formatTimestamp)} />
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
                <ReactECharts option={generateLineOptions('Serie Temporal de PM10', data, theme, formatTimestamp)} />
            </Paper>
        </Box>
    </Box>
    );
}

export default GraphicPage;
