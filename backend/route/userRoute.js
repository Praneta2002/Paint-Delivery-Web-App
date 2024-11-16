// import express from "express"
// import { loginUser,registerUser } from "../controller/userController.js"

// const userRouter =express.Router()

// userRouter.post("/register",registerUser)
// userRouter.post("/login",loginUser)

// export default userRouter;

// userProfile
import express from "express";
import { loginUser, registerUser, getUserProfile, updateProfile } from "../controller/userController.js";
import authMiddleware from "../middleware/auth.js";
import multer from 'multer';

const userRouter = express.Router();

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.post("/updateProfile", authMiddleware, upload.single('profilePhoto'), updateProfile);

export default userRouter;


// // render profile
// // userRoute.js
// import express from "express";
// import { loginUser, registerUser, getUserProfile, updateProfile } from "../controller/userController.js";
// import authMiddleware from "../middleware/auth.js";
// import multer from 'multer';

// const userRouter = express.Router();

// // Multer setup for file upload
// const upload = multer({ dest: 'uploads/' });

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);
// userRouter.post("/profile", authMiddleware, getUserProfile);
// userRouter.post("/updateProfile", authMiddleware, upload.single('profilePhoto'), updateProfile);

// export default userRouter;
