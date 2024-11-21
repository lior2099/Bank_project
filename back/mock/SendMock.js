import validator from "validator";

export const transaction = (userId , whoToSend) => {
  try {
    if (!validator.isEmail(userId)) {
      throw new Error("Invalid user");
    }

    let myMoney  = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
    let sendMoney  = Math.floor(Math.random() * (10000 - 100 + 1)) + 10;

    let moneyleft = myMoney - sendMoney;
    if (moneyleft > 0 ){
    
      return { success: true, transaction : true , moneyleft };
    } else {
      return { success: true, transaction : false , moneyleft };
    }

    
  } catch (error) {
    return { success: false, message: error.message };
  }
};
