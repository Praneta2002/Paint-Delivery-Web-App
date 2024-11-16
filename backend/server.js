// import express from "express"
// import cors from "cors"
// import { connectDB } from "./config/db.js"
// import paintRouter from "./route/paintRoute.js"
// import userRouter from "./route/userRoute.js"
// import 'dotenv/config'
// import cartRouter from "./route/cartRoute.js"
// import orderRouter from "./route/orderRoute.js"

// // app config
// const app= express()
// const port=5000


// // middleware
// app.use(express.json())
// app.use(cors()) //access frontend frm backend

// // db connection
// connectDB();

// // api endpoints
// app.use("/api/paint",paintRouter)
// app.use("/images",express.static('upload')) //to access image from web browser
// app.use("/api/user",userRouter)
// app.use("/api/cart",cartRouter)
// app.use("/api/order",orderRouter)


// app.get("/",(req,res)=>{
//     res.send("API Working")
// })

// app.listen(port,()=>{
//     console.log(`Server started on http://localhost:${port}`)
// })


// Profile
import express from "express";
import cors from "cors";
import multer from 'multer';
import path from 'path';
import { connectDB } from "./config/db.js";
import paintRouter from "./route/paintRoute.js";
import userRouter from "./route/userRoute.js";
import 'dotenv/config';
import cartRouter from "./route/cartRoute.js";
import orderRouter from "./route/orderRoute.js";

// App config
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// DB connection
connectDB();

// API endpoints
app.use("/api/paint", paintRouter);
app.use("/images", express.static('upload')); // for paintings
app.use("/uploads", express.static(path.join(process.cwd(), 'uploads'))); // for user profile
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});


// // render profile
// // server.js
// import express from "express";
// import cors from "cors";
// import multer from 'multer';
// import path from 'path';
// import { connectDB } from "./config/db.js";
// import paintRouter from "./route/paintRoute.js";
// import userRouter from "./route/userRoute.js";
// import 'dotenv/config';
// import cartRouter from "./route/cartRoute.js";
// import orderRouter from "./route/orderRoute.js";

// // App config
// const app = express();
// const port = 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Multer setup for file uploads
// const upload = multer({ dest: 'uploads/' });

// // DB connection
// connectDB();

// // API endpoints
// app.use("/api/paint", paintRouter);
// app.use("/images", express.static('upload')); // for paintings
// app.use("/uploads", express.static(path.join(process.cwd(), 'uploads'))); // for user profile
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// app.get("/", (req, res) => {
//     res.send("API Working");
// });

// app.listen(port, () => {
//     console.log(`Server started on http://localhost:${port}`);
// });

