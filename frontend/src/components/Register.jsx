import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/register",
        { username, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data);
      toast.success(data.message || "user registered successfully.");
      localStorage.setItem("jwt",data.token)
       navigate('/login')
      setUsername("")
      setEmail("")
      setPassword("")
      navigate('/login')
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors ?? "user register failed");
    }
  };

  return (
    <div className="bg-gray-400 max-w-xl rounded-xl mx-auto p-6 my-20">
      <div>
        <h1 className="font-semibold text-2xl text-center mb-8">Signup</h1>
        <form onSubmit={handleRegister}>
         <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold mt-3">Username</label>
            <input
              className="pl-3 text-lg p-2 rounded-md focus:outline-none"
              type="text"
              placeholder="Enter your Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold mt-3">Email</label>
            <input
              className="pl-3 text-lg p-2 rounded-md focus:outline-none"
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold mt-3">Password</label>
            <input
              className="pl-3 text-lg p-2 rounded-md focus:outline-none"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 mt-8 text-center flex py-2 text-white w-full justify-center font-semibold text-xl rounded-lg hover:text-black duration-300"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-lg">
            Already have an Account?{" "}
            <Link
              className="text-blue-600 hover:underline duration-300"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
