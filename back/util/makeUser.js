import { User } from "../models/users.js";

export const createUser = (foundUser) => {
  const user = new User({
    _id: foundUser._id,
    password: foundUser.password,
    first_name: foundUser.first_name,
    last_name: foundUser.last_name,
    phone_number: foundUser.phone_number,
    balance: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
  });

  return user;
};
