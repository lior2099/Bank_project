import validator from "validator";

export const transaction = async function (from, whoToSend) {
  const fromUser = await User.findOne({
    _id: from,
  });
  
  const toUser = await User.findOne({
    _id: whoToSend,
  });
  
  

};
