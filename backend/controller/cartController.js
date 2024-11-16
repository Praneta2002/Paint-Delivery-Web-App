import userModel from "../model/userModel.js";

// add to cart
const addToCart = async(req,res)=>{
    try {
        // let userData =await userModel.findById( req.body.userId);
        let userData= await userModel.findById(req.body.userId);
        let cartData =await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId] +=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ERROR"})
    }
}

// remove items from cart
const removeFromCart= async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData= await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
         res.json({success:true,message:"Removed form cart "})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ERROR"})
    }
}



// fetch user cart dat
const getCart= async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData= await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ERROR"})
    }
}



export{addToCart,removeFromCart,getCart}