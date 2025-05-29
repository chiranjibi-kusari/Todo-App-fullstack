import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { generateToken } from "../jwt/token.js";

const userSchema = z.object({
  email: z.string().email({ message: "invalid email address" }),
  username: z.string().min(3, { message: "username atleast 3 characters" }),
  password: z.string().min(6, { message: "password atleast 6 character" }),
});

export const userRregister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ message: "Missing details." });
    }
    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const aluser = await User.findOne({ email });
    if (aluser) return res.json({ message: "User already register." });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hashPassword });
    const user = await newUser.save();
    if(user){
      const token=await generateToken(user._id,res)
      res.status(201).json({ messaage: "user register successfully", user,token});
    }
    
  } catch (error) {
    console.log(error);
    res.status(501).json({ messaage: "user register error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ messaage: "Invalid email or password" });
    const token=await generateToken(user._id,res)


      res.status(200).json({ message: "user login successfully." ,user,token});
      
    
  } catch (error) {
    console.log(error);
    res.status(501).json({ messaage: "user login error" });
  }
};

export const UserLogout = async (req, res) => {
  try {
    res.clearCookie("jwt",{
      path:"/"
    })
    res.status(200).json({message:"user logged out successfully"})

  } catch (error) {
 console.log(error);
    res.status(501).json({ messaage: "user logout error" });
  }

};
