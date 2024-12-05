import { TempUser } from "../models/users.js";

export const getTempUserByPasscode = async (passcode) => {
  const foundUser = await TempUser.findOne({
    passcode: passcode,
  });
  if (!foundUser) {
    return null;
  }

  return foundUser;
};
