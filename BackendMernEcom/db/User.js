const mongoose=require("mongoose");

const userSchma=new mongoose.Schema({
  name:String,
  email:String,
  password:String
}) 

module.exports=mongoose.model("users",userSchma);