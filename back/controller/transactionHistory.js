import { getHistory } from "../mock/historyMock.js";
import jwt from 'jsonwebtoken'

export const transactionHistory = function (req, res) {
  const userId = req.user;

  try {
    const result = getHistory(userId);
    const secretKeyACC = process.env.JWT_SECRET_ACC;
    const tokenAcc = jwt.sign({ email: userId }, secretKeyACC, { expiresIn: '5m' })
    res.cookie("access_token", tokenAcc ) ;

    return res
      .status(201)
      .json({ msg: "get History of Transaction ", Transactions: result });
  } catch (Error) {
    return res.status(409).json({ msg: "fail to get History" });
  }
};
