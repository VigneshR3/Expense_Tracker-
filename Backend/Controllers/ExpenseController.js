const Expense = require("../Models/ExpenseModel");
module.exports = {
  NewExpense: async (req, res) => {
    try {
      console.log(req.body);
      //             name: 'viot',
      //   description: 'FrontEnd( React Framework & library)',
      //   category: 'cat',
      //   date: '2025-07-11'
      const { name, description, category, date, email } = req.body;
      const newData = await Expense.create({
        userId: email,
        name: name,
        description: description,
        category: category,
        date: date,
      });

      res.status(201).json({ message: "Successfully added" });
    } catch (error) {
      res.status(400).json({ message: "faild !" });
    }
  },
  GetExpense: async (req, res) => {
    try {
      console.log(req.body);
      const { email } = req.body;
      const getDate = await Expense.find({ userId: email });
      res.status(200).json({ message: "fetch data", data: getDate });
    } catch (error) {
      res.status(400).json({ message: "Faild ! fetch data" });
    }
  },
};
