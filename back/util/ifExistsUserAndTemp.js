import { User } from "../models/users.js";
import { TempUser } from "../models/users.js";

export const isExists = async (body) => {
  let foundUser = await User.findOne({
    _id: body.email,
  });
  if (foundUser) {
    return true;
  }

  let existingTempUser = await TempUser.findById(body.email);
  if (existingTempUser) {
    return true;
  }
};
