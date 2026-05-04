import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
    company:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['applied','interview','hold','selected'],
        default:'applied'
    },
    notes:{
        type:String
    },
},{timestamps:true})

const Job  = mongoose.model("Job",jobschema);
export default Job;