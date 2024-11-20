import axios from './root.service';

export const fetchLatestAlerts = async () => {
    try {
        const response = await axios.get('/alert/latest');
        const { status, data } = response;
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error('Error al obtener las alertas más recientes:', error);
        throw error;
    }
};

export const fetchFilteredAlerts = async (filters) => {
    console.log("Filtros: ", filters);
    try {
        const response = await axios.get('/alert/filtered', {
            params: filters,
        });
        const { status, data } = response;

        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error('Error al obtener alertas filtradas:', error);
        throw error;
    }
};
