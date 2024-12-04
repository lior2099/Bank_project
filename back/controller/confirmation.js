import { validationResult } from "express-validator";
import { getTempUser } from "../util/getTempUser.js";
import { createUser } from "../util/makeUser.js";

export const confirmationPost = async function (req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const body = req.body;

    const foundUser = await getTempUser(body.passcode , res);
    if (!foundUser) {
      return res.status(400).json({
        msg: "Incorrect passcode, try again",
      });
    }
    if (foundUser.expAt < Date.now()) {
      return res.status(400).json({
        msg: "A passcode is not valid, time was pass!!",
      });
    }

    const user = await createUser(foundUser);

    try {
      await user.save();
      return res.status(201).json({ msg: "user was save on the DB" });
    } catch (Error) {
      return res.status(500).json({ msg: "Error on the DB" });
    }
  }
};
