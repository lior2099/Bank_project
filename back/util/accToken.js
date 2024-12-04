import jwt from "jsonwebtoken";

export const getACCToken = (userId) => {
  const secretKeyACC = process.env.JWT_SECRET_ACC;
  const tokenAcc = jwt.sign({ email: userId }, secretKeyACC, {
    expiresIn: "5m",
  });

  return tokenAcc;
};
