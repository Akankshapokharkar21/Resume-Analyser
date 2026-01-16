const mongoose =require('mongoose');

const UserScema = new mongoose.Schema({
  email: { type:String,
    required:true
   },
   name:{
    type:String,
    required:true
   },
   role:{
    type:String,
    default:"user"
   },
   photoUrl:{
    type:String
   },


},{timestamps:true});

const userModel = mongoose.model("User",UserScema);
module.exports=userModel;