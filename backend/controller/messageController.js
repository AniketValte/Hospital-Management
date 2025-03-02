 import {Message} from "../models/messageSchema.js"; 
 import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
 import ErrorHandler from "../middlewares/errorMiddleware.js";

 export const sendMessage = catchAsyncErrors(async (req,res,next) => {
    const { firstName, lastName,email,phone,message} = req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please fill entire Form"));
    }
        await Message.create({firstName, lastName,email,phone,message});
        res.status(200).json({
            success:true,
            message: "Message send successfully"

        }); 
 });

 export const getAllMessages = catchAsyncErrors(async(req,res,next)=>{
    const messages= await Message.find();
    res.status(200).json({
        success:true,
        messages,
    });
 });



