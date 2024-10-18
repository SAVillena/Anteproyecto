import React from 'react';
function filtros() {
    return (

        <form>
            <label htmlFor="fecha">Fecha:</label>
            <input type="date" id="fecha" name="fecha"></input>
            <label htmlFor="hora">Hora:</label>
            <input type="time" id="hora" name="hora"></input>
            <label htmlFor="sensor">Sensor:</label>
            <select id="sensor" name="sensor">
                <option value="sensor1">Sensor 1</option>
                <option value="sensor2">Sensor 2</option>
                <option value="sensor3">Sensor 3</option>
            </select>
            <label htmlFor="metrica">Métrica:</label>
            <select id="metrica" name="metrica">
                <option value="pm2.5">PM2.5</option>
                <option value="pm10">PM10</option>
            </select>
            <button type="submit">Filtrar</button>
        </form>

    );
}

export default filtros;