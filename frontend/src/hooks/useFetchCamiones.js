// src/hooks/useFetchCamiones.js
import { useState, useEffect } from 'react';
import { obtenerCamiones } from '../services/truck.service';

const useFetchCamiones = () => {
    const [trucks, setTrucks] = useState([]);
    const [hasAlert, setHasAlert] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerCamiones();
                setTrucks(data);
                setHasAlert(data.some(truck => truck.porcentajeAgua <= 10));
            } catch (error) {
                console.error('Error fetching trucks:', error);
            }
        };
        fetchData();
    }, []);

    return { trucks, hasAlert };
};

export default useFetchCamiones;
