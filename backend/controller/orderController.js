// import orderModel from "../model/orderModel.js";
// import userModel from "../model/userModel.js";
// import Stripe from "stripe"
// import { getExchangeRate } from "../util/exchangeRate.js";

// const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)

// // place userr order from frontend
// const placeOrder = async (req,res)=>{

//     const frontend_url ="http://localhost:5174";
    
//     try {
//         console.log("Request body:",req.body); //log entire request body
//         const{userId,items,amt,addr} =req.body;
//         if(!userId){
//             throw new Error("userId is required");
//         }
//         if(!Array.isArray(req.body.items)){
//             throw new Error("Items must be an array");
//         }
        

//         const exchangeRate= await getExchangeRate();
//         const convertedAmount =amt*exchangeRate*100;

//         const newOrder = new orderModel({
//             userId,
//             items,
//             amount:amt,
//             addr
//         });
        
//         await newOrder.save(); // to save order in db
//         await userModel.findByIdAndUpdate(userId,{cartData:{}}); //to clear user's cart after order is placed
        
//         // if(!Array.isArray(req.body.item)){
//         //     throw new Error("Items must be an array");
//         // }

//         const line_items =req.body.items.map((item)=>({
//             price_data:{
//                 currency:"usd",
//                 product_data:{
//                     name: item.name
//                 },
//                 unit_amount:item.price*100
//             },
//             quantity:item.quantity
//         }));
//     // Adding delivery charges as a line item

//         line_items.push({
//             price_data:{
//                 currency:"usd",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100
//             },
//             quantity:1
//         });

//         const session= await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:'payment',
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         })

//         res.json({success:true,session_url:session.url});

//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"ERROR"})
//     }
// };

// // verify order api
// const verifyOrder= async (req,res)=>{
//     const {orderId,success}= req.body;
//     try {
//         if(success==='true'){
//             await orderModel.findByIdAndUpdate(orderId,{payment:true});
//             res.json({success:true,message:"Paid"})
//         }
//         else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success:false,message:"Paymnet Canceled"})
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"ERROR"})
//     }
// }

// // user orders for frontend
// const userOrder = async(req,res)=>{
//     try {
//         const orders= await orderModel.find({userId:req.body.userId});
//         res.json({success:true,data:orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"ERROR"})
//     }
// }

// // Listing orders for admin
// const listOrder= async(req,res)=>{
//     try {
//         const orders= await orderModel.find({});
//         res.json({success:true,data:orders})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"ERROR"})  
//     }
// }

// // api for updating ordering status
// const updateStatus= async(req,res)=>{
//     try {
//         await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
//         res.json({success:true,message:"Status Updated"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"ERROR"})
//     }
// }

// export {placeOrder,verifyOrder,userOrder,listOrder,updateStatus}


import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import Stripe from "stripe";
import { getExchangeRate } from "../util/exchangeRate.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";
    
    try {
        const { userId, items, amt, addr } = req.body;
        if (!userId) {
            throw new Error("userId is required");
        }
        if (!Array.isArray(items)) {
            throw new Error("Items must be an array");
        }

        const exchangeRate = await getExchangeRate();
        const convertedAmount = amt * exchangeRate * 100;

        const newOrder = new orderModel({
            userId,
            items,
            amount: amt,
            addr
        });
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log("Error placing order:", error);
        res.json({ success: false, message: error.message });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Canceled" });
        }
    } catch (error) {
        console.log("Error verifying order:", error);
        res.json({ success: false, message: error.message });
    }
};

const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error fetching user orders:", error);
        res.json({ success: false, message: error.message });
    }
};

const listOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error listing orders:", error);
        res.json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log("Error updating status:", error);
        res.json({ success: false, message: error.message });
    }
};

export { placeOrder, verifyOrder, userOrder, listOrder, updateStatus };
