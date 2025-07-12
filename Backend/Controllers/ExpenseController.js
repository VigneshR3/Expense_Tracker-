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
  // name: 'd',
  // description: 'world',
  // category: 'Food',
  // date: '2025-07-12',
  // email: 'vicky@gmail.com',
  // id: '687210b638b6ebbc50270f84'
  UpdateExpense: async (req, res) => {
    try {
      console.log("Request Body:", req.body);

      const update = await Expense.updateOne(
        { _id: req.body.id },
        {
          $set: {
            name: req.body.name,
            category: req.body.category,
            date: req.body.date,
            description: req.body.description,
          },
        }
      );

      res.status(200).json({ message: "Data updated successfully", update });
    } catch (error) {
      console.error("Update error:", error);
      res.status(400).json({ message: "Failed to update data" });
    }
  },
  DeleteOneExpense: async (req, res) => {
    try {
      console.log(req.query);
      await Expense.findOneAndDelete({ _id: req.query.id });
      res.status(200).json({ message: "successfully Deleted" });
    } catch (error) {
      res.status(400).json({ message: "Failed to Delete", error });
    }
  },
};
