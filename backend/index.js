import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config()

const app=express();
const port =process.env.PORT;

//database connection code
try {
  mongoose.connect(process.env.MONGODB_URL)
  console.log("mongoDb connected successfully.");
  
} catch (error) {
  console.log("canot connected.");
  
  
}


app.get('/',(req,res)=>{
  res.send("Welcome to todo App")
})

app.listen(port,()=>{
  console.log(`server is running on port at ${port}`)
})