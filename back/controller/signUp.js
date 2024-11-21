import { validationResult } from "express-validator";
import { smsMock } from "../mock/smsMock.js";
import { TempUser } from "../models/users.js";

export const signPost = async function (req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const body = req.body;


    const foundUser = await User.findOne({
      _id: body.email,
    });
    if (foundUser) {
      return res.status(409).json({
        msg: "The user already exists!!",
      });
    }

    const existingTempUser = await TempUser.findById(body.email);
    if (existingTempUser) {
      return res.status(409).json({
        msg: "The user already exists!!",
      });
    }

    const tempUser = new TempUser({
      _id: body.email,
      password: body.password,
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number,
    }); 

    try {
      await tempUser.save();  
    } catch (Error) {
      return res.status(500).json({ msg: "Error on the DB" });
    }

    try {
      smsMock(tempUser.passcode);
      return res.status(201).json({ msg: "send activate code" , passcode: tempUser.passcode });
    } catch (Error) {
      return res.status(409).json({ msg: "sms code was not ok" });
    }
  }
  return res.status(400).json({ msg: errors });
};
