import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { fetchData } from '../../services/graphic.service';

function GraphicPage() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData();
            setChartData(data);
        };
        getData();
    }, []);


    if (!chartData) return <p>Cargando datos...</p>;

    const { min_ad_2, max_ad_2, avg_ad_2, min_ad_3, max_ad_3, avg_ad_3, data } = chartData.data;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        date.setHours(date.getHours() - 3); // Restar 2 horas
        return date.toISOString().slice(11, 16); // Formato 'HH:MM'
    };

    const getFormattedDate = () => {
        const today = new Date();
        //Obtener solo la fecha en formato DD-MM-YYYY
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        return date;
    };

    const titleStyle = {
        textStyle: {
            color: '#FF6347', 
            fontWeight: 'bold', 
            fontSize: 20, 
        },
    };

 
    const barOptionsAd2 = {
        title: { ...titleStyle, text: 'Mínimo, Máximo y Promedio de PM 2.5 '+ getFormattedDate() },
        tooltip: {},
        xAxis: { type: 'category', data: ['Mínimo', 'Máximo', 'Promedio'] },
        yAxis: { type: 'value' },
        series: [{ 
            type: 'bar', 
            data: [min_ad_2, max_ad_2, avg_ad_2],
            label: {
                show: true,            
                position: 'inside',    
                formatter: ({ value }) => value.toFixed(1),      
                fontSize: 14,          
                color: '#fff'          
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
            data: [min_ad_3, max_ad_3, avg_ad_3] ,
            label: {
                show: true,            
                position: 'inside',    
                formatter: ({ value }) => value.toFixed(1),      
                fontSize: 14,          
                color: '#fff'          
            },
        }],
    };

    const lineOptionsAd2 = {
        title: { ...titleStyle, text: 'Serie Temporal de PM2.5' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.map((item) => formatTimestamp(item.timestamp)),
            axisLabel: { rotate: 45 }, 
        },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: data.map((item) => item.ad_2) }],
    };

    const lineOptionsAd3 = {
        title: { ...titleStyle, text: 'Serie Temporal de PM10' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.map((item) => formatTimestamp(item.timestamp)),
            axisLabel: { rotate: 45 }, 
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
