import mongoose from "mongoose";

export default async function connectMongoDb(){
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    }
    catch(error){
        console.log("Error connecting mongodb",error.message);
    }
}