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
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
  reconnectPeriod: 5000, // Esperar 5 segundos antes de intentar reconectar
  keepalive: 60, // Mantener la conexión activa enviando PING cada 60 segundos
};

// URL de conexión
const connectUrl = MQTT_URL;

/**
 * Conecta con el broker MQTT y retorna el cliente MQTT.
 * @returns {Object} Cliente MQTT.
 */
export function connectMQTT() {
  console.log("Intentando conectar a MQTT...");
  const client = mqtt.connect(connectUrl, options);

  // Eventos de conexión y reconexión
  client.on("connect", () => {
    console.log(`[${new Date().toISOString()}] Conexión exitosa con MQTT`);
  });

  client.on("reconnect", () => {
    console.log(`[${new Date().toISOString()}] Intentando reconectar...`);
  });

  // Evento de error
  client.on("error", (error) => {
    console.error(`[${new Date().toISOString()}] Error en la conexión MQTT:`, error.message);
    handleError(error, "Error en la conexión MQTT");
  });

  // Evento cuando se cierra la conexión
  client.on("close", () => {
    console.warn(`[${new Date().toISOString()}] Conexión cerrada`);
  });

  // Evento para manejar desconexión
  client.on("disconnect", (packet) => {
    console.warn(`[${new Date().toISOString()}] Cliente desconectado:`, packet);
  });

  // Evento para detectar paquetes que no llegan correctamente
  client.on("offline", () => {
    console.warn(`[${new Date().toISOString()}] El cliente está sin conexión (offline)`);
  });

  return client;
}

/**
 * Consume los mensajes de MQTT y los maneja según corresponda.
 * @param {object} client - El cliente MQTT.
 */
export function consumeMQTTMessages(client) {
  client.on("connect", () => {
    console.log("Suscribiéndose al tópico...");
    const topic = MQTT_TOPIC;

    client.subscribe(topic, (err) => {
      if (err) {
        console.error(`[${new Date().toISOString()}] Error al suscribirse al tópico: ${topic}`, err.message);
        handleError(err, `Error al suscribirse al tópico: ${topic}`);
      } else {
        console.log(`[${new Date().toISOString()}] Suscripción exitosa al tópico: ${topic}`);
      }
    });
  });

  // Manejo de mensajes entrantes
  client.on("message", (topic, message) => {
    console.log(`[${new Date().toISOString()}] Mensaje recibido:`);
    console.log(`   - Tópico: ${topic}`);
    console.log(`   - Mensaje: ${message.toString()}`);
  });
}
