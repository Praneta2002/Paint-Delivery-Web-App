// import userModel from "../model/userModel.js";
// import jwt from "jsonwebtoken" //create authentication
// import bcrypt from "bcrypt"
// import validator from "validator"


// //login user
// const loginUser = async(req,res)=>{
//     const {email,password}=req.body;
//     try{
//         const user= await userModel.findOne({email});

//         if (!user){
//             return res.json({success:false,message:"User doesn't Exist!"})
//         }

//         const isMatch= await bcrypt.compare(password,user.password)

//         if (!isMatch){
//             return res.json({success:false,message:"Invalid credential"})
//         }

//         const token =createToken(user._id);
//         res.json({success:true,token})
//     }catch(error){
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }

// const createToken =(id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET)
// }

// // register user
// const registerUser= async(req,res)=>{
//     const{name,password,email}=req.body;
//     try{
//         // checking user already exist
//         const exists= await userModel.findOne({email})
//         if(exists){
//             return res.json({success:false,message:"User already exists"})
//         }

//         // validating email format and strong password
//         if(!validator.isEmail(email)){
//             return res.json({success:false,message:"Enter valid email"})
//         }

//         if (password.length<8){
//             return res.json({success:false,message:"Please enter strong password"})
//         }

//         // hashing user password
//         const salt= await bcrypt.genSalt(5)
//         const hashedPassword= await bcrypt.hash(password,salt);

//         const newUser = new userModel({
//             name:name,
//             email:email,
//             password:hashedPassword
//         })

//         const user= await newUser.save()
//         const token= createToken(user._id)
//         res.json({success:true,token});
//     }catch(error){
//         console.log(error);
//         res.json({success:false,message:"ERROR"})
//     }
// }

// export{loginUser,registerUser}


// userProfile

import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

// Directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '24h'});
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" });
    }
};

// GET USER PROFILE
const getUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findById(userId).select("-password"); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update User Profile
const updateProfile = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request File:", req.file);

        const userId = req.body.userId;
        console.log(`User ID: ${userId}`);

        const user = await userModel.findById(userId);
        if (!user) {
            console.log(`User with ID ${userId} not found`);
            return res.status(404).json({ message: "User not found" });
        }

        // Existing user data in console
        console.log(`Existing User data: ${JSON.stringify(user)}`);

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Handle profile photo update if provided
        if (req.file) {
            // Remove old photo if it exists
            if (user.profilePhoto && fs.existsSync(path.join(__dirname, '..', user.profilePhoto))) {
                fs.unlinkSync(path.join(__dirname, '..', user.profilePhoto));
            }

            // Set new profile photo path
            user.profilePhoto = `/uploads/${req.file.filename}`;
        }

        await user.save();
        console.log(`Updated Data: ${JSON.stringify(user)}`);
        res.json({ message: "Profile photo updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export { loginUser, registerUser, getUserProfile, updateProfile };



// // render profile
// // userController.js
// import userModel from "../model/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from "url";

// // Directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Login user
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.json({ success: false, message: "User doesn't exist!" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.json({ success: false, message: "Invalid credentials" });
//         }

//         const token = createToken(user._id);
//         res.json({ success: true, token });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };

// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2h' });
// };

// // Register user
// const registerUser = async (req, res) => {
//     const { name, password, email } = req.body;
//     try {
//         // Check if user already exists
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         // Validate email format and strong password
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Enter a valid email" });
//         }

//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" });
//         }

//         // Hash user password
//         const salt = await bcrypt.genSalt(5);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedPassword
//         });

//         const user = await newUser.save();
//         const token = createToken(user._id);
//         res.json({ success: true, token });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "ERROR" });
//     }
// };

// // GET USER PROFILE
// const getUserProfile = async (req, res) => {
//     try {
//         const userId = req.body.userId; // Get userId from auth middleware
//         const user = await userModel.findById(userId).select("-password"); // Exclude password field
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.json(user);
//     } catch (error) {
//         console.error("Error fetching user profile:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // Update User Profile
// const updateProfile = async (req, res) => {
//     try {
//         const userId = req.body.userId; // Get userId from auth middleware

//         const user = await userModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Update user fields
//         user.name = req.body.name || user.name;
//         user.email = req.body.email || user.email;

//         // Handle profile photo update if provided
//         if (req.file) {
//             // Remove old photo if it exists
//             if (user.profilePhoto && fs.existsSync(path.join(__dirname, '..', user.profilePhoto))) {
//                 fs.unlinkSync(path.join(__dirname, '..', user.profilePhoto));
//             }

//             // Set new profile photo path
//             user.profilePhoto = `/uploads/${req.file.filename}`
//         }

//         await user.save();
//         console.log(`Updated Data: ${JSON.stringify(user)}`);
//         res.json({
//             message: "Profile updated successfully",
//             user: {
//                 name: user.name,
//                 email: user.email,
//                 profilePhoto: user.profilePhoto
//             }
//         });
//     } catch (error) {
//         console.error("Error updating profile:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// export { loginUser, registerUser, getUserProfile, updateProfile };
