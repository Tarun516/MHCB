import { Router } from "express";
import { getAllEmergencyContacts } from "../controllers/emergencycontact.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", verifyJWT, getAllEmergencyContacts);

export default router;
