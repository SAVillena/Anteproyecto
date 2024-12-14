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
        lineStyle: { color: 'FF5733' },
        itemStyle: { color: theme.palette.primary.main },
    }],
});

export const generateRealTimeLinePM25Options = (title, seriesData, theme) => ({
    title: {
        text: title,
        textStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
        },
    },
    tooltip: {
        trigger: 'axis',
        formatter: (params) => {
            const point = params[0];
            const date = new Date(seriesData[params[0].dataIndex].timestamp); // Obtener el timestamp correspondiente
            const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
            return `Tiempo: ${time}<br />Valor: ${point.value.toFixed(2)}`;
        },
    },
    xAxis: {
        type: 'category',
        data: seriesData.map((item) => {
            const date = new Date(item.timestamp);
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0'); // Asegurar que siempre tenga dos dígitos
            return `${hours}:${minutes}`; // Mostrar hora:minutos en el eje X
        }),
        axisLabel: {
            rotate: 0, // Mantén las etiquetas sin rotación
            color: theme.palette.text.primary,
        },
        boundaryGap: false,
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: theme.palette.text.primary,
        },
    },
    series: [{
        type: 'line',
        data: seriesData.map((item) => item.ad_2), 
        lineStyle: {
            color: theme.palette.primary.main, 
            width: 2,
        },
        itemStyle: {
            color: theme.palette.primary.main, 
        },
        areaStyle: { 
            color: theme.palette.primary.light,
            opacity: 0.3,
        },
    }],
});





export const generateRealTimeLinePM10Options = (title, seriesData, theme) => ({
    title: {
        text: title,
        textStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
        },
    },
    tooltip: {
        trigger: 'axis',
        formatter: (params) => {
            const point = params[0];
            const date = new Date(seriesData[point.dataIndex].timestamp); // Obtener el timestamp correspondiente
            const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
            return `Tiempo: ${time}<br />Valor: ${point.value.toFixed(2)}`;
        },
    },
    xAxis: {
        type: 'category',
        data: seriesData.map((item) => {
            const date = new Date(item.timestamp);
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0'); // Asegurar que siempre tenga dos dígitos
            return `${hours}:${minutes}`; // Mostrar hora:minutos en el eje X
        }),
        axisLabel: {
            rotate: 0, // Mantén las etiquetas sin rotación
            color: theme.palette.text.primary,
        },
        boundaryGap: false,
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: theme.palette.text.primary,
        },
    },
    series: [{
        type: 'line',
        data: seriesData.map((item) => item.ad_3), 
        lineStyle: {
            color: theme.palette.primary.main, 
            width: 2,
        },
        itemStyle: {
            color: theme.palette.primary.main, 
        },
        areaStyle: { 
            color: theme.palette.primary.light,
            opacity: 0.3,
        },
    }],
});
