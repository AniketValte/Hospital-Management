import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message:{
        type: String,
        required: true,
        minLength:[10,"message must conatin atleast 10 characters "]
    },
});

export const Message = mongoose.model("Message",messageSchema)