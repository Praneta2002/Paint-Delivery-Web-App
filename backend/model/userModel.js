// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{type:String,required:true},
//     email:{type:String,required:true,unique:true},
//     password:{type:String,required:true},
//     cartData:{type:Object,default:{}}
// },{minimize:false})  //minized:false coze if we dnt then cart data will b created w/o any data 

// const userModel= mongoose.model.user || mongoose.model("user",userSchema) //model creation if not created already
// export default userModel;

// userProfile
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String },
    cartData: { type: Object, default: {} }
}, { minimize: false }); // Prevent minimizing of objects

const userModel = mongoose.model.user || mongoose.model("User", userSchema); // Create model if not created already
export default userModel;
