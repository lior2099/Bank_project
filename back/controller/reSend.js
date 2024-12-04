import { isUserExists } from "../util/ifExistUser.js";
import { getTempUser } from "../util/getTempUser.js";
import { updateTemp } from "../util/updateTempUser.js";
import nodemailer from "nodemailer";
import { sendMail } from "../util/sendMail.js";

export const reSend = async function (req, res) {
  const userId = req.body.email;

  isUserExists(userId);

  let existingTempUser = getTempUser(userId);
  if (!existingTempUser) {
    return res.status(409).json({
      msg: "too much time was pass need to sign-up again",
    });
  }

  updateTemp(existingTempUser);

  try {
    await existingTempUser.save();
  } catch (Error) {
    return res.status(500).json({ msg: "Error on the DB" });
  }

  if (sendMail(existingTempUser)) {
    return res.status(201).json({
      msg: "send activate code to your mail",
    });
  } else {
    return res.status(409).json({ msg: "code was not send to email" });
  }
};
