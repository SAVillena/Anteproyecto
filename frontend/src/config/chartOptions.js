export const generateBarOptions = (title, dataValues, theme) => ({
    title: {
        text: title,
        textStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
        },
    },
    tooltip: {},
    xAxis: { type: 'category', data: ['Mínimo', 'Máximo', 'Promedio'] },
    yAxis: { type: 'value' },
    series: [{
        type: 'bar',
        data: dataValues,
        itemStyle: { color: theme.palette.secondary.main },
        label: {
            show: true,
            position: 'inside',
            formatter: ({ value }) => value.toFixed(1),
            fontSize: 14,
            color: theme.palette.text.primary,
        },
    }],
});

export const generateLineOptions = (title, seriesData, theme, formatTimestamp) => ({
    title: {
        text: title,
        textStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
        },
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: seriesData.map((item) => formatTimestamp(item.timestamp)),
        axisLabel: { rotate: 45, color: theme.palette.text.primary },
    },
    yAxis: { type: 'value' },
    series: [{
        type: 'line',
        data: seriesData.map((item) => item.ad_2),
        lineStyle: { color: theme.palette.primary.main },
        itemStyle: { color: theme.palette.primary.main },
    }],
});

export const lineChartOptions = (theme) => ({
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
            lineStyle: { color: theme.palette.primary.main },
            itemStyle: { color: theme.palette.primary.main },
        },
    ],
});

export const barChartOptions = (theme) => ({
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    },
    yAxis: { type: 'value' },
    series: [
        {
            name: 'Ventas',
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110, 130],
            itemStyle: { color: theme.palette.secondary.main },
        },
    ],
});
