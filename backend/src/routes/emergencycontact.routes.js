import { Router } from "express";
import { getAllEmergencyContacts } from "../controllers/emergencycontact.controller.js";

const router = Router();

router.get("/get-emergency-contacts", getAllEmergencyContacts);

export default router;
