import express from "express";
import { loginPost } from "../controller/login.js";
import { loginValidator } from "../middleware/loginValidator.js";

const router = express.Router();


router.post("/", loginValidator , loginPost);

export default router; 