import express from "express";
import { loginValidator } from "../middleware/loginValidator.js";
import { nameValidator } from "../middleware/nameValidator.js";
import { phoneValidator } from "../middleware/phoneValidator.js";
import { signPost } from "../controller/signUp.js";
import { reSend } from "../controller/reSend.js";
import { confirmationPost } from "../controller/confirmation.js";

const router = express.Router();


router.post("/", loginValidator, nameValidator, phoneValidator, signPost);
router.post("/re-send", reSend);
router.post("/confirmation" , confirmationPost);

export default router; 