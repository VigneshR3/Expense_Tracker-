var jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require('../Models/UserModel')
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // invalid token
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err)
        return res.status(401).json({ message: "You are not authorized" });

      req.payload = { userdata: decoded };
      next();
    });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const isUserMiddlware = async (req, res, next) => {
  try {
    const { userdata } = req.payload;

    if (userdata.role === "USER") {
      next();
    }
  } catch (error) {
    return res.json({ success: false, message: "your not Authorized" });
  }
};
const isPremiumCheck = async (req , res , next)=>{
  try {
    const Ischeck = await User.findOne({_id:req.body.user})
    console.log("dff",Ischeck)
    if(Ischeck.isPremium){
      next()
    }
    
  } catch (error) {
    res.json({ success: false, message: "your not Authorized" });
  }

}

module.exports = { authMiddleware, isUserMiddlware,isPremiumCheck };
