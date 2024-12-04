import { getACCToken } from "../util/accToken.js";
import { getUser } from "../util/getExistsUser.js";

export const balance = async function (req, res) {
  const userId = req.user;

  const foundUser = await getUser(userId, res);

  const newToken = await getACCToken(userId);

  return res.status(201).json({
    msg: "get Balance",
    Balance: [foundUser.balance],
    access_token: newToken,
  });
};
