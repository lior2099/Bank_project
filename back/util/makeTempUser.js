import { TempUser } from "../models/users.js";

export const createTempUser = (body) => {
  let tempUser = new TempUser({
    _id: body.email,
    password: body.password,
    first_name: body.first_name,
    last_name: body.last_name,
    phone_number: body.phone_number,
  });

  return tempUser;
};
