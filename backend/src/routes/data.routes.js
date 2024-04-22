"use strict";
import { Router } from "express";
import dataController from "../controllers/data.controller.js";
//agregar middleware de autenticación

const router = Router();

router.get("/", dataController.getData);
router.get("/show", dataController.showData);

export default router;