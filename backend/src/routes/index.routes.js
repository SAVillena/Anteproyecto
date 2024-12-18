"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de datos */
import dataRoutes from "./data.routes.js";

/** Enrutador de alertas */
import alertRoutes from "./alert.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los datos /api/data
router.use("/data", dataRoutes);
// Define las rutas para las alertas /api/alert
router.use("/alert", alertRoutes);


// Exporta el enrutador
export default router;
