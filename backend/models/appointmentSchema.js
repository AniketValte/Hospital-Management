import mongoose from "mongoose";
import validator from "validator";


const appointmentSchema = new mongoose.Schema({
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
    appointment_date:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    doctor:{
        firstName:{
            type:String,
            required:true,   
        },
        lastName:{
            type:String,
            required:true,   
        },
    },
    hasVisited:{
        type:Boolean,
        default:false,
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending",
    },
    
});

export const Appointment = mongoose.model("Appointment",appointmentSchema); 