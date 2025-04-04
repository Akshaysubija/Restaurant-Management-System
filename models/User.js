// models for User schema //
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["Admin", "Waiter", "Chef", "Cashier"], default: "Waiter" }
});

module.exports = mongoose.model("User", UserSchema);
