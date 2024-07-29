import mongoose from "mongoose";

export default async function connectMongoDb(){
    try{
    await mongoose.connect("mongodb://localhost:27017/github-db");
    console.log("MongoDB Connected");
    }
    catch(error){
        console.log("Error connecting mongodb",error.message);
    }
}