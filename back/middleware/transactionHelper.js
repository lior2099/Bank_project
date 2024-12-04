import mongoose from "mongoose";
import { User, Transaction } from "../models/users.js";

export const transaction = async function (from, to, amount) {
  const fromUser = await User.findOne({ _id: from });
  if (!fromUser) {
    return { success: false, who: [from] };
  }

  const toUser = await User.findOne({ _id: to });
  if (!toUser) {
    return { success: false, who: [to] };
  }

  if (fromUser.balance < amount) {
    const msg = "User don't have this amount have only " + fromUser.balance;
    return { success: true, transaction: false, money: fromUser.balance, msg };
  }

  const session = await mongoose.connection.startSession();

  try {
    session.startTransaction();

    const newTransaction = new Transaction({
      from: from,
      to: to,
      money: amount,
    });

    await newTransaction.save({ session });

    fromUser.balance -= amount;
    fromUser.transactions.push(newTransaction._id);

    toUser.balance += amount;
    toUser.transactions.push(newTransaction._id);

    await fromUser.save({ session });
    await toUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      transaction: true,
      from: fromUser._id,
      to: toUser._id,
      new_balance: fromUser.balance,
      transactionId: newTransaction._id,
    };
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    return { success: false, error: error.message };
  }
};
