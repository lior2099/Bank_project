
import jwt from 'jsonwebtoken'

export const refreshToken = function (req, res) {

  const userId = req.user;

  const secretKeyACC = process.env.JWT_SECRET_ACC;
  const secretKeyREF = process.env.JWT_SECRET_REF;
 
  const tokenAcc = jwt.sign({ email: userId }, secretKeyACC, { expiresIn: '5m' })
  const tokenRef = jwt.sign({ email: userId }, secretKeyREF, { expiresIn: '5h' })
  
  return res
  .cookie("access_token", tokenAcc ) 
  .cookie("Refresh_token" , tokenRef)
  .status(200).json({"msg" : "Refresh token was done " , "Token Access" : tokenAcc , "Token Refresh" : tokenRef});
};
