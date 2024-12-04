import { validationResult } from "express-validator";
import { getACCToken } from "../util/accToken.js";
import { getREFToken } from "../util/RefToken.js";
import { getUser } from "../util/getExistsUser.js";

export const loginPost = async function (req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const body = req.body;

    const foundUser = await getUser(body.email, res);

    if (!foundUser) {
      return res.status(401).json({ msg: "log-in failed , bad email" });
    }

    const tokenAcc = await getACCToken(body.email);
    const tokenRef = await getREFToken(body.email);

    if (body.password == foundUser.password) {
      return res.status(200).json({
        msg: "log-in was ok",
        "Access_Token": tokenAcc,
        "Refresh_Token": tokenRef,
      });
    } else {
      return res.status(401).json({ msg: "log-in failed , bad password" });
    }
  }
};
