 
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = {
  UserLogin: async (req, res) => {
    try {
      console.log(req.body);
      const GetUser = await User.findOne({ email: req.body.email });
      const Email = req.body.email;
      const password = req.body.password;
      const match = await bcrypt.compare(password, User.password);

      if (Email === GetUser.email) {
        if (match) {
          res.status(200).json({ message: "Login Successfully " });
        } else {
          res.status(401).json({ message: "Username/password are incorrect" });
        }
      } else {
        res.status(401).json({ message: "Username/password are incorrect" });
      }
    } catch (error) {
      res.status(401).json({ message: "Faild ! to Login " });
    }
  },
  UserRegisters: async (req, res) => {
      try {
        console.log(req.body);
  
        const ExitUser = await User.findOne({ email: req.body.email });
        console.log("efef", ExitUser);
        if (!ExitUser) {
          const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          });
          await newUser.save();
          res.status(201).json({ message: "Successfully created" });
        } else {
          res.status(401).json({ message: "Faild ! to created/user Exit " });
        }
      } catch (error) {
        res.status(401).json({ message: "Faild ! to created " });
      }
    },
};
