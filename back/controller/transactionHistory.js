import { getHistory } from "../mock/historyMock.js";
import { User } from "../models/users.js";
import jwt from "jsonwebtoken";

export const transactionHistory = async function (req, res) {
  const userId = req.user;
  console.log(userId);

  try {
    const fromUser = await User.findById(userId) 
    .populate("transactions")
    .exec();
    if (!fromUser) {
      return res.status(409).json({ msg: "user is not found" });
    }

    console.log(fromUser);

    const result = getHistory(userId);
    const secretKeyACC = process.env.JWT_SECRET_ACC;
    const tokenAcc = jwt.sign({ email: userId }, secretKeyACC, {
      expiresIn: "5m",
    });
    res.cookie("access_token", tokenAcc);

    return res
      .status(201)
      .json({ msg: "get History of Transaction ", Transactions: result });
  } catch (Error) {
    return res.status(409).json({ msg: "fail to get History" });
  }
};
