import express from "express";
import { broadcastMessage, getMessege } from "../controllers/broadcastController.js";
import auth from "../middlewares/Auth.js";

const router = express.Router();

router.get("/", auth, getMessege);
router.post("/", auth, broadcastMessage);

export default router;
