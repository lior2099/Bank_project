import jwt from "jsonwebtoken";
import { User } from "../models/users.js";

export const transactionSend = async function (req, res) {
  const from = req.user;
  const to = req.body.whoToSend;

  const result = transaction(from , to);
  if (result.success == false){
    let send = "user " + result.who + " was not found" ; 
    return res.status(409).json({ msg: send });
  }

  const secretKeyACC = process.env.JWT_SECRET_ACC;
  const tokenAcc = jwt.sign({ email: userId }, secretKeyACC, {
    expiresIn: "5m",
  });
  res.cookie("access_token", tokenAcc);

  if (result.transaction == true) {
    
    let name = "Transaction was done to " + whoToSend;
    return res.status(201).json({ msg: [name], new_balance: result.moneyleft });
  } else {
    return res
      .status(201)
      .json({
        msg: "Transaction was faile need more money",
        money_need: -result.moneyleft,
      });
  }
};
