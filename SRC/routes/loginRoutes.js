import express from "express";
import { loginUser } from "../controllers/loginController.js";
import validateLogin from "../middlewares/validateLogin.js";

const router = express.Router();

router.post("/login", validateLogin, loginUser);

export default router;
