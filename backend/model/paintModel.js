import mongoose from "mongoose";

const paintSchema= new mongoose.Schema({
    name: {type:String,required:true},
    description:{type:String,required:true},
    artist:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    imageHash:{type:String,unique:true},
    category:{type:String,required:true}
})

const paintModel= mongoose.Model.paint || mongoose.model("painting",paintSchema)

export default paintModel;

