import { User } from "../models/users.js";
import { getACCToken } from "../util/accToken.js";
import { getHistory } from "../util/getHistoryTrans.js";

export const getInfo = async function (req, res) {
  const userId = req.user;

  try {
    const user = await User.findById(userId)
      .populate("transactions")
      .exec();
    
    if (!user) {
      return res.status(409).json({ msg: "User not found" });
    }

    const transactionHistory = getHistory(user);
    const newToken = await getACCToken(userId);

    return res.status(200).json({
      msg: "User information retrieved successfully",
      user_info: {
        user_id: userId,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        balance: user.balance,
        transactions: transactionHistory
      },
      Access_Token: newToken
    });
  } catch (error) {
    console.error('Error getting user info:', error);
    return res.status(500).json({ msg: "Failed to get user information" });
  }
}; 