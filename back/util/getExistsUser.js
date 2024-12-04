import { User } from "../models/users.js";

export const getUser = async (userId, res) => {
  const foundUser = await User.findOne({
    _id: userId,
  });
  if (!foundUser) {
    return null;
  }
  return foundUser;
};
