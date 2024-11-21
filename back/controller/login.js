import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import { User } from "../models/users.js";


export const loginPost = async function( req , res) {
  const secretKeyACC = process.env.JWT_SECRET_ACC;
  const secretKeyREF = process.env.JWT_SECRET_REF;

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    const body = req.body;


    const foundUser = await User.findOne({
      _id: body.email,
    });
    if (!foundUser) {
      return res.status(409).json({
        msg: "A user is not found!!",
      });
    }
    
    const tokenAcc = jwt.sign({ email: body.email }, secretKeyACC, { expiresIn: '5m' })
    const tokenRef = jwt.sign({ email: body.email }, secretKeyREF, { expiresIn: '5h' })

    return res
    .cookie("access_token", tokenAcc ) 
    .cookie("Refresh_token" , tokenRef)
    .status(200).json({"msg" : "log-in was ok" , "Token Access" : tokenAcc , "Token Refresh" : tokenRef});
  
  }
}


