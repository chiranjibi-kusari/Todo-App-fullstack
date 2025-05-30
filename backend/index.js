import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from "cors"
import todoRoute from '../backend/routes/todo.route.js'
import userRouter from '../backend/routes/user.route.js'
import cookieParser from 'cookie-parser';


dotenv.config()

const app=express();
const port =process.env.PORT;
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:"GETS,POST,PUT,DELETE",
  allowedHeaders:["Content-Type","Authorization"]
}))
//database connection code
try {
  await mongoose.connect(process.env.MONGODB_URL)
  console.log("mongoDb connected successfully.");
  
} catch (error) {
  console.log("can not connected.");

}

app.use('/todo',todoRoute)
app.use("/user",userRouter)




app.get('/',(req,res)=>{
  res.send("Welcome to todo App.")
})

app.listen(port,()=>{
  console.log(`server is running on port at ${port}`)
})