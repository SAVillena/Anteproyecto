import React, { useState, useEffect } from 'react';
import { fetchData, fetchGraphicSerieData } from '../services/graphic.service.js';
import ReactECharts from 'echarts-for-react';
import images from '../services/image.service.js';



function Graficos() {
    // Configuración del gráfico
    const lineal = {
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Ventas',
                type: 'line',
                data: [120, 200, 150, 80, 70, 110, 130],
            },
        ],
    };

    const a = {
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Ventas',
                type: 'bar',
                data: [120, 200, 150, 80, 70, 110, 130],
            },
        ],
    };

    return(
        <>
        <ReactECharts option={lineal} />
        <ReactECharts option={a} />
        </>
    );
};


export default Graficos;
