const Expense = require("../Models/ExpenseModel");
module.exports = {
  NewExpense: async (req, res) => {
    try {
      const { name, description, category, date } = req.body;
      const { userdata } = req.payload;

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
      console.log("playload", req.payload);
      const { userdata } = req.payload;
      const getDate = await Expense.find({ userId: userdata.id });
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
  CategoryList: async (req, res) => {
    try {
      const { id } = req.query;
      const category = await Expense.find({ userId: id });
      let catlist = [...new Set(category.flatMap((item) => item.category))];
      console.log("LIst", id, category, catlist);
      res.status(200).json({ message: "successfully", list: catlist });
    } catch (error) {
      res.status(400).json({ message: "Failed to List", error });
    }
  },
 FetchFilterExpense: async (req, res) => {
  const { category, Date: dateRange, user } = req.body;

  console.log("Incoming Filter:", { category, dateRange, user });

  const filter = {};

  // Filter by userId
  if (user) {
    filter.userId = user;
  }

  // Filter by category
  if (category && category.length > 0) {
    filter.category = { $in: category };
  }

  // Filter by date range
  if (dateRange?.startDate && dateRange?.EndDate) {
    const start = new Date(dateRange.startDate);

    // Extend EndDate to 23:59:59.999 to include entire day
    const end = new Date(dateRange.EndDate);
    end.setHours(23, 59, 59, 999);

    filter.date = {
      $gte: start,
      $lte: end,
    };
  }

  console.log("MongoDB Query:", filter); // Debug actual query

  try {
    const filteredExpenses = await Expense.find(filter);
    return res.status(200).json({ data: filteredExpenses });
  } catch (error) {
    console.error("Error filtering expenses:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

};
