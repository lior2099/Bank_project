import { getACCToken } from "../util/accToken.js";
import { getREFToken } from "../util/RefToken.js";

export const refreshToken = function (req, res) {
  const userId = req.user;

  const tokenAcc = getACCToken(userId);
  const tokenRef = getREFToken(userId);

  return res
    .status(200)
    .json({
      msg: "Refresh token was done ",
      "Access_Token": tokenAcc,
      "Refresh_Token": tokenRef,
    });
};
