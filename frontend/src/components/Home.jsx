import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");


  const navigate=useNavigate()
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) return;

    try {
      const response = await axios.post(
        "http://localhost:4000/todo/create",
        { 
        text: newTodo ,
        completed: false 
      },
        { withCredentials: true }
      );
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:4000/todo/update/${id}`,
        { ...todo, completed: !todo.completed },
        { withCredentials: true }
      );
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("failed to find todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("failed to delete todo");
    }
  };

  const logout=async()=>{
    try {
      await axios.get("http://localhost:4000/user/logout",{withCredentials:true})
  
      toast.success("User logged out successfully");
          navigate("/login")
      localStorage.removeItem("jwt")
     
    } catch (error) {
      toast.error("Error logout failed")
    }
  }
  const remainingTodos=todos.filter((todo)=>!todo.completed).length
  return (
    <div className="bg-gray-300 max-w-lg lg:max-w-xl rounded-xl shadow-lg mx-8 sm:mx-auto p-6 my-10">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
      <div className="flex mb-4">
        <input onChange={(e)=>setNewTodo(e.target.value)}
        onKeyPress={(e)=>e.key==="Enter" && todoCreate()}
          className="flex-grow px-2 border rounded-l-md focus:outline-none text-lg"
          type="text" value={newTodo}
          placeholder="Add a new todo"
        />
        <button onClick={todoCreate} className=" cursor-pointer bg-blue-600 rounded-r-md p-2 text-white">
          Add
        </button>
      </div>
      {loading?(<div className="text-center mt-2 mb-4"><span className="text-center items-center">Loading....</span></div>):error?(<div className="text-center text-red-600 font-semibold">{error}</div>):(
        <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex gap-2 items-center" key={index}>
              <input
                className="p-4"
                type="checkbox"
                checked={todo.completed}
                onChange={() => todoStatus(todo._id)}
              />
              <span
                className={` ${
                  todo.completed
                    ? "line-through text-gray-800 font-semibold"
                    : ""
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              className="text-red-500 text-lg hover:text-red-800 duration-300"
              onClick={() => {
                todoDelete(todo._id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
  
      </ul>
      )}
      
      <p className="text-center mt-4">{remainingTodos} remaining todos</p>
      <button onClick={()=>logout()} className="block bg-red-500 hover:bg-red-800 duration-300 cursor-pointer py-2 px-4 text-white rounded-md mt-6 mx-auto ">
        Logout
      </button>
    </div>
  );
};

export default Home;
