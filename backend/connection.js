import mongoose from "mongoose";

const connectdb = async () =>{
   try{
        const conn = await mongoose.connect("mongodb://localhost:27017/Job")
        console.log(`Mongo DB Connected,${conn}`);
   }
   catch(err){
     console.error("Mongodb connection error",err.message)
   }
}

export default connectdb;