import express from "express"
import { addPaint,listPaint,removePaint } from "../controller/paintController.js";
import multer from "multer";

const paintRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`) //unique filename
    }
})

const upload =multer({storage:storage})

paintRouter.post("/add",upload.single("image"),addPaint)
paintRouter.get("/list",listPaint)
paintRouter.post("/remove",removePaint);




export default paintRouter;
