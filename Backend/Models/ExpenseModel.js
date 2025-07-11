const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExpenseSchema = Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
