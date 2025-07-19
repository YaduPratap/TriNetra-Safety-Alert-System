import express from "express";
import { updateUserLocation, getUserById } from "../controllers/userController.js";
import auth from "../middlewares/Auth.js";

const router = express.Router();

router.patch("/update-location", auth, updateUserLocation);
router.get("/getUser", auth, getUserById);

export default router;