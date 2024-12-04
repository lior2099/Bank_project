import jwt from "jsonwebtoken";
import {transaction} from "../middleware/transactionHelper.js";
import { getACCToken } from "../util/accToken.js";

export const transactionSend = async function (req, res) {
  const from = req.user;
  const {to , amount} = req.body;

  const result = await transaction(from , to , amount);

  if (result.success == false){
    let send = "user " + result.who + " was not found" ; 
    return res.status(409).json({ msg: send });
  }

  if (result.transaction == false){
    return res.status(400).json({ msg: result.msg });
  }

  const newToken = getACCToken(from);

  if (result.transaction == true) {
    
    let name = "Transaction was done to " + to;
    return res.status(201).json({ msg: [name], new_balance: result.new_balance 
    , "access_token" : newToken });
  } else {

    return res
      .status(201)
      .json({
        msg: result.msg,
        money_need: result.money - amount ,
        "access_token" : newToken 
      });
  }
};
