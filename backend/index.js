import express from "express";
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import exploreRoutes from './routes/explore.route.js';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';

import passport from "passport";
import './Passport/github.auth.js'
import connectMongoDb from "./db/connectMongoDb.js";
import session from 'express-session'
import path from 'path'
dotenv.config();
const app=express();
const PORT=5000;
const __dirname=path.resolve();
app.use(cors());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);
app.use("/api/auth",authRoutes);

app.use(express.static(path.join(__dirname,"/frontend/my-project/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","my-project","dist","index.html"))
})

console.log("dirname",__dirname);
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    connectMongoDb();
})