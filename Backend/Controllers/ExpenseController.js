const Expense = require("../Models/ExpenseModel");
module.exports = {
  NewExpense: async (req, res) => {
    try {
      
      
      const { name, description, category, date, } = req.body;
      const {userdata} = req.payload
       
      const newData = await Expense.create({
        userId: userdata.id,
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
      console.log("playload",req.payload);
      const { userdata } = req.payload;
      const getDate = await Expense.find({userId:userdata.id})
      res.status(200).json({ message: "fetch data", data: getDate });
    } catch (error) {
      res.status(400).json({ message: "Faild ! fetch data" });
    }
  },
   
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
