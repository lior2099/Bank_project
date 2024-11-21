import validator from "validator";

export const getHistory = (userId) => {
  try {
    if (!validator.isEmail(userId)) {
      throw new Error("Invalid user");
    }

    var history = [];
    var i = 0 ;
   while(i < 9){
    let name = 'transaction_' + i;
    history.push({ [name] : Math.floor(Math.random() * (10000 - 100 + 1)) + 100});
    i++;
   }


    return { success: true, history };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
