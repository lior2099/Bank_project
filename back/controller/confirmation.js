import { validationResult } from "express-validator";
import { User } from "../models/users.js";
import { TempUser } from "../models/users.js";

export const confirmationPost = async function (req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const body = req.body;

    const foundUser = await TempUser.findOne({
      passcode: body.passcode,
    });
    if (!foundUser) {
      return res.status(409).json({
        msg: "A passcode is not valid!!",
      });
    }

    if (foundUser.expAt < Date.now()) {
      return res.status(409).json({
        msg: "A passcode is not valid time was pass!!",
      });
    }

    const user = new User({
      _id: foundUser._id,
      password: foundUser.password,
      first_name: foundUser.first_name,
      last_name: foundUser.last_name,
      phone_number: foundUser.phone_number,
      balance: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
    });

    try {
      await user.save();
      return res.status(201).json({ msg: "user was save on the DB" });
    } catch (Error) {
      return res.status(500).json({ msg: "Error on the DB" });
    }
  }
};
