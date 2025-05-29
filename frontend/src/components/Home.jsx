import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo,setNewTodo]=useState("")

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/todo/fetch", {
          withCredentials: true,
          headers:{
            "Content-Type":"application/json"
          }
        });

        setTodos(response.data);
        setError(null);

      } catch (error) {
        setError("failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos()
  }, []);

  const todoCreate=async()=>{
    if(!newTodo) return;

    try {
      const response=await axios.post("http://localhost:4000/todo/create",{text:newTodo},{completed:false},{withCredentials:true})
      setTodos([...todos,response.data])
      setNewTodo('')
    } catch (error) {
      setError("failed to create todo");
    }
  }
  return <div>
  home
  </div>;
};

export default Home;
