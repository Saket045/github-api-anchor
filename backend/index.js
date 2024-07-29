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
dotenv.config();
const app=express();
app.use(cors());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);
app.use("/api/auth",authRoutes);
const PORT=5000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectMongoDb();
})