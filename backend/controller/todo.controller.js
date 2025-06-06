import { Todo } from "../model/todo.model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user:req.user._id //associate todo with logged in user
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "todo created successfully", newTodo });
  } catch (error) {
    res.status(400).json({ message: "error occuring while todo creation" });
  }};

export const getTodos=async (req,res)=>{
  try {
    const todos=await Todo.find({user:req.user._id}); //fetch todos only for loggedin user.
    res.status(201).json({ message: "todo fetched successfully",todos});
  } catch (error) {
      res.status(400).json({ message: "error occuring while todo fetching" });
  }}

export const updateTodo=async (req,res)=>{
 try {
   const todo=await Todo.findByIdAndUpdate(req.params.id,req.body,{
    new:true
  })
   res.status(201).json({ message: "todo update successfully",todo});
 } catch (error) {
  res.status(400).json({ message: "error occuring while todo update" });
 }}

export const deleteTodo=async(req,res)=>{
  try {
    const todo=await Todo.findByIdAndDelete(req.params.id)
    if(!todo) return res.status(404).json({message:"todo not found"})
    res.status(201).json({ message: "todo delete successfully",todo});
  } catch (error) {
     res.status(400).json({ message: "error occuring while todo delection" });
  }

}