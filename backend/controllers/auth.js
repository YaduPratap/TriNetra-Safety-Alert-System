import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const register = async (req, res) =>{
    const { name, email, password, roles } = req.body;
    try {
        const exsistUser = await User.findOne({email});
        if (exsistUser) {
            return res.status(400).json({ message: "User Already Exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password:hashedPassword, roles});
        res.status(200).json({ code: 200, status: "Success" });
    } catch (error) {
        res.status(500).json({ code: 500, status: "failed", message: error.message });
    }
}

const login = async(req, res) =>{
    const { email, password } = req.body;
    // console.log("Login request:", email, password);
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        const token = jwt.sign({ userId:user._id, role:user.roles, userName: user.name }, process.env.SECRET, { expiresIn: "24h" });
        // res.status(200).json({ message: "Login successful", token });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
              name: user.name,
              email: user.email,
              role: user.roles,
            }
          });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {register, login};