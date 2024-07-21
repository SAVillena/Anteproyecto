import mqtt from "mqtt";
import { handleError } from "../utils/errorHandler.js";
import {
    MQTT_PASSWORD,
    MQTT_TOPIC,
    MQTT_URL,
    MQTT_USERNAME,
    } from "./configEnv.js";

// Configuración de conexión MQTT
const options = {
  clean: true, 
  connectTimeout: 4000, 
  // clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
  clientId: "e9a4a49e982e44ff9c4fbfa6aef5c5b2",
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
};

// URL de conexión
const connectUrl = MQTT_URL;

/**
 * Connects to the MQTT broker and returns the MQTT client.
 * @returns {Object} The MQTT client object.
 */
export function connectMQTT() {
  const client = mqtt.connect(connectUrl, options);

  client.on("reconnect", (error) => {
    console.log("Reconectando:", error);
  });

  client.on("error", (error) => {
    handleError(error, "Error en la conexión MQTT");
  });

  return client;
}

/**
 * Consume MQTT messages and handle them accordingly.
 * 
 * @param {object} client - The MQTT client object.
 */
export function consumeMQTTMessages(client) {
  client.on("connect", () => {
    console.log("Conexión exitosa con MQTT");
    // Suscribirse al tópico especificado en el archivo .env
    const topic = MQTT_TOPIC;
    client.subscribe(topic, (err) => {
      if (err) {
        handleError(err, `Error al suscribirse al tópico: ${topic}`);
      } else {
        console.log(`Suscripción exitosa al tópico: ${topic}`);
      }
    });
  });

  client.on("message", (topic, message) => {
    console.log(`Mensaje recibido en el tópico ${topic}: ${message.toString()}`);
    // Aquí puedes manejar el mensaje 
  });
}
