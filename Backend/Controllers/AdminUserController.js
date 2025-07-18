const User = require('../Models/UserModel')

const GetAllUsers = async (req , res)=>{
try {
    const allUser = await User.find()
    res.json({message:"Get all users",allUser:allUser})
} catch (error) {
    res.status(500).json({success:false,message:"Can not get All user"})
}
}
module.exports = {GetAllUsers}