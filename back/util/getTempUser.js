import { TempUser } from "../models/users.js";

export const getTempUser = async (email) => {
  const foundUser = await TempUser.findOne({
    _id: email,
  });
  if (!foundUser) {
    return null;
  }

  return foundUser;
};
