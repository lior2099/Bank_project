import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  "_id": {
    type: String,
  },
  "password": {
    type: String,
    required: true,
  },
  "first_name": {
    type: String,
    required: true,
  },
  "last_name": {
    type: String,
    required: true,
  },
  "phone_number": {
    type: String,
    required: true,
  },
  "balance": {
    type: Number,
    required: true,
  },
  "transactions": {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Transaction',
  },
} , {timestamps : true});

const transactionSchema = new mongoose.Schema({
  "from": {
    type: String,
    required: true,
  },
  "to": {
    type: String,
    required: true,
  },
  "money": {
    type: Number,
    required: true,
  },
  "date": {
    type: Date,
    default: Date.now()
  },
});

const TempSchema = new mongoose.Schema({
  "_id": {
    type: String,
  },
  "password": {
    type: String,
    required: true,
  },
  "first_name": {
    type: String,
    required: true,
  },
  "last_name": {
    type: String,
    required: true,
  },
  "phone_number": {
    type: String,
    required: true,
  },
  "passcode": {
    type: Number,
    default : Math.floor(100000 + Math.random() * 900000),
  },
  "expAt": {
    type: Date,
    default : Date.now() + (5*100*1000),
  },
  
});


const User = mongoose.model("User", UserSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);
const TempUser = mongoose.model("TempUser", TempSchema);

export {User , Transaction , TempUser}; 
