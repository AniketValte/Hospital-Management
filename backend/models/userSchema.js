import mongoose from "mongoose";
import validator from "validator";
import bcrypt from"bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength:[3,"First Name Must contain At least 3 Characters!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength:[3,"Last Name Must contain At least 3 Characters!"]
    },
    email:{
        type: String,
        required: true,
        validate:[validator.isEmail,"please provide a valid email"] //validator is a package which contains many methods such like isemail which checks the provides string is email or not
    },
    phone:{
        type: String,
        required: true,
        minLength:[10,"Mobile number must contain 10 digits"],
        maxLength:[10,"Mobile number must contain 10 digits"]
    },
    nic:{
        type: String,
        required: true,
        minLength:[12,"Aadhar number must contain 12 digits"],
        maxLength:[12,"Aadhar number must contain 12 digits"]

    },
    dob:{
       type:Date,
       required:[true,"DOB is required"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female","Other"],
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password atleast contain 8 characters"],
        select:false,  // when we take users data , we got everything except password beacause we use select : false
    },
    role :{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
    },
    doctorDepartment:{
        type:String,
    },
    docAvatar:{
        public_id:String,
        url:String,
    },

});

// user data jab bhi save hoga to us vakt password ko ham hash form mai convert karke save karage for user security perpose

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// password jo hoga wo ex -123 aisa hoga lekin yaha save hash mai kiya hai so us original se compare karne ke liye aur ek method likhenge

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

// method for generating token

userSchema.methods.generateJsonWebToken = function (){
    return jwt.sign({ id : this._id },process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User",userSchema)