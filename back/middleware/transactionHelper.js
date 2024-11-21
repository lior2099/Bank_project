import validator from "validator";

export const transaction = async function (from, whoToSend) {
  const fromUser = await User.findOne({
    _id: from,
  });
  if (!fromUser) {
    return { success: false  , "who" : [from]};
  }

  const toUser = await User.findOne({
    _id: whoToSend,
  });
  if (!toUser) {
    return { success: false  , "who" : [whoToSend]};
  }

  
  let moneyleft = fromUser.balance - toUser.balance;
  if (moneyleft > 0) {
    return { success: true, transaction: true, "from" : [fromUser._id] ,
       "to" : [toUser._id] , "money" : moneyleft };
  } else {
    return { success: true, transaction: false, "from" : [fromUser._id] ,
      "to" : [toUser._id] , "money" : moneyleft };
  }
};
