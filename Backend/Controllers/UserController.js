const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;
module.exports = {
  UserLogin: async (req, res) => {
    try {
      console.log("login",req.body);
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
       

      const ExitUser = await User.findOne({ email: req.body.email });
      if (!ExitUser) {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        console.log("efef", ExitUser,hashedPassword);
 
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          phonenumber :  String(req.body.phonenumber)
        });
        await newUser.save();
        res.status(201).json({ message: "Successfully created" });
      } else {
        res.status(401).json({ message: "Faild ! to created/user Exit " });
      }
    } catch (error) {
      console.log(error)
      res.status(401).json({ message: "Faild ! to created ",error });
    }
  },
  IsCheckUser : (req , res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
    
        // invalid token
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
          console.log("decodeadmin",decoded)
          if (err)
            return res.status(401).json({ message: "You are not authorized" });
      
          if(decoded.role === "USER"){
            return res.status(200).json({success:true,role:"USER"})
          }
          if(decoded.role === "ADMIN"){
            return res.status(200).json({success:true,role:"ADMIN"})
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
      if(Users.id){

        const isPremium = await User.updateOne({_id:Users.id},{$set:{isPremium:true}})
        console.log("Isfrgrg",isPremium)
        res.status(200).json({ message: "your get Premium",success:true });
        return
    }
    return res.status(401).json({ message: "You are not authorized/Go to Login" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }

  }
  
};
