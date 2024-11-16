import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://kinnart2000:PranetaKrisha2822@cluster0.8sqcrgs.mongodb.net/paint-del').then(()=>console.log("DB Connected"));
}