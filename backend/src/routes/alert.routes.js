import { Router } from "express";
import alertController from "../controllers/alert.controller.js";

const router = Router();

router.get("/", alertController.getAlerts);
router.post("/createAlert", alertController.createAlert);
router.post("/deleteAlert", alertController.deleteAlert);

export default router;