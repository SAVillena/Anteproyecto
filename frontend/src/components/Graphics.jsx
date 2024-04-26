import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/graphic.service.js';
import ReactECharts from 'echarts-for-react';
const DataComponent = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData.data.total);
      } catch (error) {
        // Maneja el error, quizás estableciendo un estado de error
        console.error('Error al cargar los datos:', error);
      }
    };

    loadData();
  }, []); // El arreglo vacío asegura que esto se ejecute solo una vez al montar
  // Renderiza tu componente basado en los datos obtenidos
  const seriesLabel = {
    show: true
  };
  const chartData = {
    title: {
      text: 'Metricas PM2.5 y PM10', 
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['MIN', 'MAX', 'AVG']
    },
    grid: {
      left: 100
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'value',
      name: 'Rango',
      axisLabel: {
        formatter: '{value}'
      }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: ['PM 2.5', 'PM 10'],
      axisLabel: {
        formatter: function (value) {
          return value;
        },
        margin: 20,
        rich: {
          value: {
            lineHeight: 30,
            align: 'center'
          },          
        }
      }
    },
    series: [
      {
        name: 'MIN',
        type: 'bar',
        data: [data.min_ad_2, data.min_ad_3], //PM 2.5, PM10
        label: seriesLabel,
      },
      {
        name: 'AVG',
        type: 'bar',
        label: seriesLabel,
        data: [data.avg_ad_2, data.avg_ad_3] // PM 2.5, PM10
      },
      {
        name: 'MAX',
        type: 'bar',
        label: seriesLabel,
        data: [data.max_ad_2, data.max_ad_3] //PM 2.5, PM10
      },
    ]
  };


  const serie ={
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 43, 49],
          type: 'line',
          stack: 'x'
        },
        {
          data: [5, 4, 3, 5, 10],
          type: 'line',
          stack: 'x'
        }
      ]
  };
  return (
    <><div className="container">
    <div className="section left">
    <ReactECharts
      option={chartData}
      style={{ height: '400px', width: '100%' }} // Ajusta estas dimensiones como prefieras
      notMerge={true}
      lazyUpdate={true}
      theme={"theme_name"}/>
    </div>
    <div className="section right">
    <ReactECharts
      option={serie}
      style={{ height: '400px', width: '100%' }} // Ajusta estas dimensiones como prefieras
      notMerge={true}
      lazyUpdate={true}
      theme={"theme_name"}/>
    </div>
  </div>
  <div>
  </div>
  </>
    
  );
};

export default DataComponent;
