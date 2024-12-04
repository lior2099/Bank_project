

export const updateTemp = async (existingTempUser) => {
  existingTempUser.passcode = Math.floor(100000 + Math.random() * 900000);
  existingTempUser.expAt = Date.now() + 5 * 100 * 1000;


};
