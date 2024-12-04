import express from "express";
import { tokenACCValidator } from '../middleware/tokenValidator.js'
import { tokenREFValidator } from '../middleware/tokenValidator.js'
import { balance } from '../controller/balance.js';
import { transactionHistory } from '../controller/transactionHistory.js';
import { transactionSend } from '../controller/transactionSend.js';
import { refreshToken } from '../controller/refresh.js';
import { getInfo } from '../controller/getInfo.js';

const router = express.Router();

router.get("/balance", tokenACCValidator, balance);
router.get("/transaction", tokenACCValidator, transactionHistory);
router.post("/transaction", tokenACCValidator, transactionSend);
router.post("/refresh", tokenREFValidator, refreshToken);
router.get("/user-info", tokenACCValidator, getInfo);

export default router; 