import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Paper } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { fetchData } from '../../services/graphic.service';

function GraphicPage() {
    const theme = useTheme(); // Accedemos al tema para los colores y el modo
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData();
            setChartData(data);
        };
        getData();
    }, []);

    if (!chartData) return <Typography variant="h6" sx={{ padding: 2 }}>Cargando datos...</Typography>;

    const { min_ad_2, max_ad_2, avg_ad_2, min_ad_3, max_ad_3, avg_ad_3, data } = chartData.data;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        date.setHours(date.getHours() - 3); // Ajuste de zona horaria
        return date.toISOString().slice(11, 16); // Formato 'HH:MM'
    };

    const getFormattedDate = () => {
        const today = new Date();
        return today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    };

    const titleStyle = {
        textStyle: {
            color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary, // Color dinámico según el modo
            fontWeight: 'bold',
            fontSize: 20,
        },
    };

    const barOptionsAd2 = {
        title: { ...titleStyle, text: 'Mínimo, Máximo y Promedio de PM 2.5 ' + getFormattedDate() },
        tooltip: {},
        xAxis: { type: 'category', data: ['Mínimo', 'Máximo', 'Promedio'] },
        yAxis: { type: 'value' },
        series: [{
            type: 'bar',
            data: [min_ad_2, max_ad_2, avg_ad_2],
            itemStyle: {
                color: theme.palette.secondary.main,
            },
            label: {
                show: true,
                position: 'inside',
                formatter: ({ value }) => value.toFixed(1),
                fontSize: 14,
                color: theme.palette.text.primary,
            },
        }],
    };

    const barOptionsAd3 = {
        title: { ...titleStyle, text: 'Mínimo, Máximo y Promedio de PM 10' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Mínimo', 'Máximo', 'Promedio'] },
        yAxis: { type: 'value' },
        series: [{
            type: 'bar',
            data: [min_ad_3, max_ad_3, avg_ad_3],
            itemStyle: {
                color: theme.palette.secondary.main,
            },
            label: {
                show: true,
                position: 'inside',
                formatter: ({ value }) => value.toFixed(1),
                fontSize: 14,
                color: theme.palette.text.primary,
            },
        }],
    };

    const lineOptionsAd2 = {
        title: { ...titleStyle, text: 'Serie Temporal de PM2.5' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.map((item) => formatTimestamp(item.timestamp)),
            axisLabel: { rotate: 45, color: theme.palette.text.primary },
        },
        yAxis: { type: 'value' },
        series: [{
            type: 'line',
            data: data.map((item) => item.ad_2),
            lineStyle: { color: theme.palette.primary.main },
            itemStyle: { color: theme.palette.primary.main },
        }],
    };

    const lineOptionsAd3 = {
        title: { ...titleStyle, text: 'Serie Temporal de PM10' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.map((item) => formatTimestamp(item.timestamp)),
            axisLabel: { rotate: 45, color: theme.palette.text.primary },
        },
        yAxis: { type: 'value' },
        series: [{
            type: 'line',
            data: data.map((item) => item.ad_3),
            lineStyle: { color: theme.palette.primary.main },
            itemStyle: { color: theme.palette.primary.main },
        }],
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
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 4,
                padding: 3,
            }}
        >
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
                <ReactECharts option={barOptionsAd2} />
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
                <ReactECharts option={barOptionsAd3} />
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
                <ReactECharts option={lineOptionsAd2} />
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
                <ReactECharts option={lineOptionsAd3} />
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
                <ReactECharts option={realTime} />
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
                <ReactECharts option={realTime} />
            </Paper>
        </Box>
    );
}

export default GraphicPage;
