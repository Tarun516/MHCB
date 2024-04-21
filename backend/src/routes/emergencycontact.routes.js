import { Router } from "express";
import { getAllEmergencyContacts } from "../controllers/emergencycontact.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/get-emergency-contacts", verifyJWT, getAllEmergencyContacts);

export default router;
