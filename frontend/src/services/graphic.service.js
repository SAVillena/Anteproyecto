import axios from './root.service';

export const fetchData = async () => {
  try {
    // Realiza la solicitud GET a la ruta 'data/'
    const response = await axios.get('data/');
    const { status, data } = response;

    if (status === 200) {
      // Maneja la respuesta como necesites, aquí solo la estamos imprimiendo
      return data; // Retorna los datos para su uso en otro lugar
    }
  } catch (error) {
    console.error('Hubo un error al obtener los datos:', error);
    throw error; // Propagar el error para manejarlo donde se llame esta función
  }
};

export const fetchGraphicSerieData = async () => {
  try {
    const response = await axios.get('data/getDataSerie');
    const { status, data } = response;

    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.error('Hubo un error al obtener los datos:', error);
    throw error;
  }
};

export const fetchFilteredData = async (filters) => {
  try {
    console.log('Estoy en el servicio');
    console.log(filters);
    const response = await axios.get('data/getFilterData', {
      params: filters, // Enviar filtros como parámetros de consulta
    });
    const { status, data } = response;
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener datos filtrados:', error);
    throw error;
  }
};
