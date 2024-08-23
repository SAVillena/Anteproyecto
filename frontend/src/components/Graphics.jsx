import React, { useState, useEffect } from 'react';
import { fetchData, fetchGraphicSerieData } from '../services/graphic.service.js';
import ReactECharts from 'echarts-for-react';
import images from '../services/image.service.js';

const DataComponent = () => {
  const [data, setData] = useState(null);
  const [serieData, setSerieData] = useState({ data2: [], data3: [], data_max_2: [], data_max_3: []});

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData.data.total);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
    const loadSerieData = async () => {
      try {
        const fetchedSerieData = await fetchGraphicSerieData();
        const data2 = fetchedSerieData.data.data.map((item) => [new Date(item.timestamp), item.ad_2]);
        const data3 = fetchedSerieData.data.data.map((item) => [new Date(item.timestamp), item.ad_3]);
        const data_max_2 = fetchedSerieData.data.max_ad_2;
        const data_max_3 = fetchedSerieData.data.max_ad_3;
        setSerieData({ data2, data3, data_max_2, data_max_3});
      } catch (error) {
        console.error('Error al cargar los datos de serie:', error);
      }
    };

    loadData();
    loadSerieData().then(() => {
      const interval = setInterval(() => {
        loadSerieData();
        loadData();
        console.log("actualizado serie y datos");
      }, 300000); // Cada 5 minutos
      return () => clearInterval(interval);
    });
  }, []);

  const seriesLabel = {
    show: true
  };

  const maximo = () => {
    if(serieData.data_max_2 > serieData.data_max_3){
      return serieData.data_max_2;
    } else {
      return serieData.data_max_3;
    }
  };

  const chartData = {
    title: {
      text: 'Metricas PM2.5 y PM10',
      textStyle: {
        color: '#ffffff'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['MIN', 'MAX', 'AVG'],
      textStyle: {
        color: '#ffffff'
      }
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
          if (value === 'PM 2.5') {
            return '{gas25|} ' + value;
          } else if (value === 'PM 10') {
            return '{gas10|} ' + value;
          }
          return value;
        },
        margin: 20,
        rich: {
          value: {
            lineHeight: 30,
            align: 'center'
          },
          gas25: {
            height: 30,
            align: 'center',
            backgroundColor: {
              image: images.gas25
            }
          },
          gas10: {
            height: 30,
            align: 'center',
            backgroundColor: {
              image: images.gas10
            }
          }          
        }
      }
    },
    series: [
      {
        name: 'MIN',
        type: 'bar',
        data: data ? [data.min_ad_2, data.min_ad_3] : [0],
        label: seriesLabel,
      },
      {
        name: 'AVG',
        type: 'bar',
        label: seriesLabel,
        data: data ? [data.avg_ad_2, data.avg_ad_3] : [0]
      },
      {
        name: 'MAX',
        type: 'bar',
        label: seriesLabel,
        data: data ? [data.max_ad_2, data.max_ad_3] : [0]
      },
    ]
  };

  const serie = {
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      scale: true,
      max: maximo() + 5,
    },
    series: [
      {
        data: serieData.data2,
        type: 'line',
        name: 'PM2.5',
        smooth: true,
        showsymbol: false,
      },
      {
        data: serieData.data3,
        type: 'line',
        name: 'PM10',
        smooth: true,
        showsymbol: false,
      }
    ],
    title: {
      text: 'Grafico en serie, PM2.5 y PM10',
      textStyle: {
        color: '#ffffff'
      }
    },
    legend: {
      data: ['PM2.5', 'PM10'],
      textStyle: {
        color: '#ffffff'
      }
    },
  };

  return (
    <>
      <div className='graphics-container'>
        <ReactECharts
          option={chartData}
          style={{ height: '52%', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}/>
        <label>Camion: </label>
        <img src={images.camion} alt="Camion" style={{ width: '50px', height: '50px' }} />
        <label>Stock de agua: </label>
        <img src={images.agua} alt="agua" style={{ width: '50px', height: '50px' }}  />
        <label>Caex: </label>
        <img src={images.caex} alt="caex" style={{ width: '50px', height: '50px' }} />
        <label>VOCS: </label>
        <img src={images.vocs} alt="vocs" style={{ width: '50px', height: '50px' }} />
        <label>CO2: </label>
        <img src={images.co2} alt="co2" style={{ width: '50px', height: '50px' }} />
        <ReactECharts
          option={serie}
          style={{ height: '52%', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}/>
      </div>
    </>
  );
};

export default DataComponent;
