import express from "express";
import { registerUser } from "../controllers/registerController.js";
import validateRegister from "../middlewares/validateRegister.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);

export default router;
