import validator from 'validator';

export const getBalance = (userId) => {
  try {
    if (!validator.isEmail(userId)) {
      throw new Error('Invalid user');
    }

    const balance = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

    return { success: true, balance };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
