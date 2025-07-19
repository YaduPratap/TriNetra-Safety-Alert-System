import { report, getAllCrime, getCrimeLocation } from "../controllers/crime.js";
import express from "express";
import auth from "../middlewares/Auth.js";
import upload from "../middlewares/Upload.js";

const route = express.Router();

route.post("/report", auth, upload.array("proof", 5), report);
route.get("/getCrime", auth, getAllCrime);
route.get("/getCrimeLocation/:typeOfCrime?", auth, getCrimeLocation);

export default route;