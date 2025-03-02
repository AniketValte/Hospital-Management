import { Error } from "mongoose";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

// only admin should access the dashboard thats why we are adding this admin aunthentication

export const isAdminAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin Not Authenticated",400));
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if(req.user.role!=="Admin"){
        return next(new ErrorHandler(`${req.user.role} not available for this resources!`));
    }
    next();
});


// for patient authentication as well as autharisation

export const isPatientAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient Not Authenticated",400));
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if(req.user.role!=="Patient"){
        return next(new ErrorHandler(`${req.user.role} not available for this resources!`));
    }
    next();
    
});