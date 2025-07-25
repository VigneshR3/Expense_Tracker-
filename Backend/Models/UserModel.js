const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phonenumber:{type : String , required :true},
  role: { type: String, default: "USER" },
  isPremium: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
