import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';
import { lineChartOptions, barChartOptions } from '../config/chartOptions';

function Graficos() {
    const theme = useTheme();

    return (
        <>
            <ReactECharts option={lineChartOptions(theme)} />
            <ReactECharts option={barChartOptions(theme)} />
        </>
    );
}

export default Graficos;
