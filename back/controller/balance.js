import jwt from "jsonwebtoken";
import { User } from "../models/users.js";

export const balance = async function (req, res) {
  const userId = req.user;

  const foundUser = await User.findOne({
    _id: userId,
  });
  if (!foundUser) {
    return res.status(409).json({
      msg: "A user is not found!!",
    });
  }

  const secretKeyACC = process.env.JWT_SECRET_ACC;

  const tokenAcc = jwt.sign({ email: userId }, secretKeyACC, {
    expiresIn: "5m",
  });
  res.cookie("access_token", tokenAcc);

  return res.status(201).json({ msg: "get Balance", "Balance": [foundUser.balance] });
};
