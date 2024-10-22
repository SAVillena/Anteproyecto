import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { fetchData } from '../../services/graphic.service'; // Asegúrate de tener este servicio configurado

function GraphicPage() {
    const [chartData, setChartData] = useState(null);

    // Cargar datos desde el backend al montar el componente
    useEffect(() => {
        const getData = async () => {
            const data = await fetchData();
            setChartData(data);
        };
        getData();
    }, []);

    // Verificar si los datos están cargados
    if (!chartData) return <p>Cargando datos...</p>;

    const { min_ad_2, max_ad_2, avg_ad_2, min_ad_3, max_ad_3, avg_ad_3, data } = chartData.data;
    const titleStyle = {
        textStyle: {
            color: '#FF6347', // Cambia el color del título (Ejemplo: Tomate)
            fontWeight: 'bold', // Negrita
            fontSize: 20, // Tamaño de fuente
        },
    };

    // Configuraciones de los gráficos de barra
    const barOptionsAd2 = {
        title: { ...titleStyle, text: 'Mínimo, Máximo y Promedio de PM 2.5' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Mínimo', 'Máximo', 'Promedio'] },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [min_ad_2, max_ad_2, avg_ad_2] }],
    };

    const barOptionsAd3 = {
        title: { ...titleStyle, text: 'Mínimo, Máximo y Promedio de PM 10' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Mínimo', 'Máximo', 'Promedio'] },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [min_ad_3, max_ad_3, avg_ad_3] }],
    };

    // Configuraciones de los gráficos lineales
    const lineOptionsAd2 = {
        title: { ...titleStyle, text: 'Serie Temporal de PM2.5' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.map((item) => item.timestamp),
        },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: data.map((item) => item.ad_2) }],
    };

    const lineOptionsAd3 = {
        title: { ...titleStyle, text: 'Serie Temporal de PM10' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.map((item) => item.timestamp),
        },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: data.map((item) => item.ad_3) }],
    };

    const realTime = {
        title: { ...titleStyle, text: 'Grafico en tiempo real' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.map((item) => item.timestamp),
        },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: data.map((item) => item.ad_3) }],
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                padding: '16px',
            }}
        >
            <ReactECharts option={barOptionsAd2} />
            <ReactECharts option={barOptionsAd3} />
            <ReactECharts option={lineOptionsAd2} />
            <ReactECharts option={lineOptionsAd3} />
            <ReactECharts option={realTime} />
            <ReactECharts option={realTime} />
        </Box>
    );
}

export default GraphicPage;
