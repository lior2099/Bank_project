import jwt from "jsonwebtoken";
import {transaction} from "../middleware/transactionHelper.js";

export const transactionSend = async function (req, res) {
  const from = req.user;
  const {to , amount} = req.body;

  const result = await transaction(from , to , amount);

  if (result.success == false){
    let send = "user " + result.who + " was not found" ; 
    return res.status(409).json({ msg: send });
  }

  const secretKeyACC = process.env.JWT_SECRET_ACC;
  const tokenAcc = jwt.sign({ email: from }, secretKeyACC, {
    expiresIn: "5m",
  });
  res.cookie("access_token", tokenAcc);

  if (result.transaction == true) {
    
    let name = "Transaction was done to " + to;
    return res.status(201).json({ msg: [name], new_balance: result.new_balance });
  } else {

    return res
      .status(201)
      .json({
        msg: result.msg,
        money_need: result.money - amount ,
      });
  }
};
