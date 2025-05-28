import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import todoRoute from '../backend/routes/todo.route.js'

dotenv.config()

const app=express();
const port =process.env.PORT;
app.use(express.json())

//database connection code
try {
  await mongoose.connect(process.env.MONGODB_URL)
  console.log("mongoDb connected successfully.");
  
} catch (error) {
  console.log("can not connected.");

}

app.use('/todo',todoRoute)



app.get('/',(req,res)=>{
  res.send("Welcome to todo App")
})

app.listen(port,()=>{
  console.log(`server is running on port at ${port}`)
})