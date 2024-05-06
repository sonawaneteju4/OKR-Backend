import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    priority : {
        type : String,
        required : true,
        enum : ["low","medium","high"]
    },
    status : {
        type : String,
        required : true,
        enum : ["open","closed","proccessing"]
    
    },
    category : {
        type : String,
        required : true,
        enum : ["bug","feature","question","support","enhancement",]
    },
    issue : {
        type : String,
        required : true,
    },
    resolution : {
        type : String,
    },
    expectedTime : {
        type : String,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now  
    }
},{timestamps:true});

export default mongoose.model("Ticket",ticketSchema);