import { validationResult } from "express-validator";
import { isExists } from "../util/ifExistsUserAndTemp.js";
import { createTempUser } from "../util/makeTempUser.js";
import { sendMail } from "../util/sendMail.js";

export const signPost = async function (req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const body = req.body;
    let ifFound = await isExists(body, res);
    if (ifFound){
      return res.status(409).json({
        msg: "The user already exists!!",
      });
    }

    let tempUser = createTempUser(body);

    try {
      await tempUser.save();
    } catch (Error) {
      return res.status(500).json({ msg: "Error on the DB" });
    }

    try {
      await sendMail(body.email, tempUser);
      return res.status(201).json({
        msg: "send activate code to your mail",
      });
    } catch (error) {
      return res.status(500).json({ msg: "code was not send to email" });
    }
  }
  return res.status(400).json({ msg: errors });
};
