import { User } from "../models/users.js";

export const isUserExists = async (userId, res) => {
  let foundUser = await User.findOne({
    _id: userId,
  });
  if (foundUser) {
    return res.status(409).json({
      msg: "The user already exists!!",
    });
  }
};
