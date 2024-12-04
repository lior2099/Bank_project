import { getHistory } from "../util/getHistoryTrans.js";
import { User } from "../models/users.js";

import { getACCToken } from "../util/accToken.js";

export const transactionHistory = async function (req, res) {
  const userId = req.user;

  try {
    const fromUser = await User.findById(userId)
      .populate("transactions")
      .exec();
    if (!fromUser) {
      return res.status(409).json({ msg: "user is not found" });
    }

    const result = getHistory(fromUser);
    const newToken = getACCToken(userId);

    return res.status(201).json({
      msg: "get History of Transaction ",
      Transactions: result,
      access_token: newToken,
    });
  } catch (Error) {
    return res.status(409).json({ msg: "fail to get History" });
  }
};
