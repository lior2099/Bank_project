import { TempUser } from "../models/users.js";

export const getTempUser = async (sendPasscode ,res) => {
  const foundUser = await TempUser.findOne({
    passcode: sendPasscode,
  });
  if (!foundUser) {
    return null;
  }

  return foundUser;
};
