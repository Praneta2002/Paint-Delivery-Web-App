import paintModel from "../model/paintModel.js";
import fs from 'fs';
import path from 'path';
import crypto from'crypto';

// to generate hash of image file
const generateImageHash = (filePath) =>{
    return new Promise((resolve,reject)=>{
        const hash =crypto.createHash('sha256');
        const stream =fs.createReadStream(filePath);

        stream.on('data',(data)=>{
            hash.update(data);
        });
        stream.on('end',()=>{
            resolve(hash.digest('hex'));
        });
        stream.on('error',(err)=>{
            reject(err);
        });
    });
};

// add paint item
const addPaint = async(req,res) => {
    const imagePath=path.join('upload',req.file.filename);

    try{
        const imageHash = await generateImageHash(imagePath);

        // Checking for existing imageHash
        const existingPaint = await paintModel.findOne({imageHash:imageHash});
        if(existingPaint){
            fs.unlink(imagePath,(err)=>{
                if(err) console.error("failed to delete duplicate image:",err);
            });
            return res.json({success:false,message:"This image has already been uploaded!"});
        }


        const paint = new paintModel({
            name:req.body.name,
            description:req.body.description,
            artist:req.body.artist,
            price:req.body.price,
            category:req.body.category,
            image:req.file.filename,
            imageHash:imageHash  
        });

        await paint.save();
        res.json({success:true,message:"Painting Added"}) 
    } catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

    }

    
// all paint list
const listPaint =async(req,res)=>{
    try{
        const paints= await paintModel.find({});
        res.json({success:true,data:paints})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"ERROR"})
    }
}

// remove paint item
const removePaint = async(req,res)=>{
    try{
        const paint =await paintModel.findById(req.body.id);
        if(!paint){
            return res.json({success:false,message:"Paint not found"});
        }
        const imagePath =path.join('upload',paint.image);

        // to delete img file from upload folder:

        fs.unlink(imagePath,(err)=>{
            if (err){
                console.error("Failed to delete img file ",err);
            }
        });
        
        //to delete from db

        await paintModel.findByIdAndDelete(req.body.id); 
        res.json({success:true,message:"PAINT REMOVED"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"ERROR"})
    }

}

export{addPaint,listPaint,removePaint}

