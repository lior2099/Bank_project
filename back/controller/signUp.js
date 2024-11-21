import { validationResult } from "express-validator";
import { smsMock } from "../mock/smsMock.js";
import { TempUser } from "../models/users.js";
import { User } from "../models/users.js";
import nodemailer from "nodemailer";

export const signPost = async function (req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const body = req.body;

    let foundUser = await User.findOne({
      _id: body.email,
    });
    if (foundUser) {
      return res.status(409).json({
        msg: "The user already exists!!",
      });
    }

    let existingTempUser = await TempUser.findById(body.email);
    if (existingTempUser) {
      return res.status(409).json({
        msg: "The user already exists!!",
      });
    }

    let tempUser = new TempUser({
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
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail address
          pass: process.env.EMAIL_PASS, // Your Gmail app password
        },
      });

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: "shlior1955@gmail.com",
        subject: "Your Activation Code",
        text: `Your activation code is: ${tempUser.passcode}`,
        html: `<p>Your activation code is: <strong>${tempUser.passcode}</strong></p>`,
      };

      await transporter.sendMail(mailOptions);

      // smsMock(tempUser.passcode);
      return res.status(201).json({
        msg: "send activate code to your mail",
      });
    } catch (Error) {
      return res.status(409).json({ msg: "sms code was not ok" });
    }
  }
  return res.status(400).json({ msg: errors });
};
