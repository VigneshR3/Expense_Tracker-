const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;
module.exports = {
  UserLogin: async (req, res) => {
    try {
      console.log(req.body);
      const GetUser = await User.findOne({ email: req.body.email });
      const Email = req.body.email;
      const password = req.body.password;
      const match = await bcrypt.compare(password, GetUser.password);
      console.log(GetUser, "matchhhhhh0");
      if (match) {
        const token = jwt.sign(
          {  id: GetUser._id, username: GetUser.username , role:GetUser.role ,isPremium:GetUser.isPremium},
          process.env.SECRET_KEY
        );
        console.log(token, "tokentokentoken");
        res.header("Authorization",token)
        res.status(200).json({token, message: "Login Successfully " });
      } else {
        res.status(401).json({ message: "Username/password are incorrect" });
      }
    } catch (error) {
      res.status(401).json({ message: "Faild! to Login " });
    }
  },
  UserRegisters: async (req, res) => {
    try {
      console.log(req.body, "register.....");
      console.log(req.payload, "from midddddllellware")

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
  IsCheckUser : (req , res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
    
        // invalid token
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
          if (err)
            return res.status(401).json({ message: "You are not authorized" });
    
          if(decoded){
            return res.status(200).json({success:true})
          }
        });
      } catch (error) {
        console.error("Auth error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

  },
  GetPremium :async (req ,res)=>{
    try {
      const {Users , GetPre} = req.body
      console.log("body",   )
      const isPremium = await User.updateOne({_id:Users.id},{$set:{isPremium:true}})
      console.log("Isfrgrg",isPremium)
      res.status(200).json({ message: "your get Premium",success:true });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }

  }
};
