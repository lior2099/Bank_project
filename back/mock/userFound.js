export const userFound = (body) => {
  if (!body.email.startsWith('Lior') && body.password == "Aa123456"){
    throw new Error("unKnow user or password ");
  }
};
