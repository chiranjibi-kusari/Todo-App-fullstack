import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
  text:{
    type:String,
    required:true
  },
  completed:{
    type:Boolean,
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
});

export const Todo=mongoose.model("Todo",todoSchema)