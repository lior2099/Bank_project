import jwt from "jsonwebtoken";

export const getREFToken = (userId) => {
  const secretKeyREF = process.env.JWT_SECRET_REF;
  const tokenREF = jwt.sign({ email: userId }, secretKeyREF, {
    expiresIn: "5h",
  });

  return tokenREF;
};
