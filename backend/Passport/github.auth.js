import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import userModel from '../models/user.model.js'
import User from '../models/user.model.js';
const GITHUB_CLIENT_ID="Ov23liJxeZYkxamlXjlm";
const GITHUB_CLIENT_SECRET="64c1378d906de5d32470981718666f8895eac42f"
dotenv.config();
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
  // Use the GitHubStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and GitHub
  //   profile), and invoke a callback with a user object.
  passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret:GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
     const user=await userModel.findOne({username:profile.username});
     if(!user){
     const newUser=new User({
      name:profile.displayName,
      username:profile.username,
      profileUrl:profile.profileUrl,
      avatarUrl:profile.photos[0].value,
      likedProfiles:[],
      likedBy:[]
     })
     await newUser.save();
     done(null,newUser);
     }
     else{
      done(null,user);
     }
    }
  ));
  
  
  
  