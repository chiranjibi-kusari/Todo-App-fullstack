import mongoose from "mongoose";
import { string } from "zod";
const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },token:{
    type:String
  }
})

export const User=mongoose.model("User",userSchema)