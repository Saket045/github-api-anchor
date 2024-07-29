import User from '../models/user.model.js'

export const getUserProfileAndRepos=async(req,res)=>{
    const {username} = req.params;
        try {
     const userRes=await fetch(`https://api.github.com/users/${username}`,{
        headers:{
            authorization:`${process.env.GITHUB_API_KEY}`
        }
     });
     const userProfile=await userRes.json();
     const repoRes=await fetch(userProfile.repos_url);
     const repos=await repoRes.json();
     res.status(200).json({userProfile,repos})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export const likeProfile=async(req,res)=>{
    try {
        const {username}=req.params;
        const user=await User.findById(req.user._id.toString());
        console.log("auth user",user)
        const userToLike=await User.findOne({username:username});
        if(!userToLike)
           return  res.status(404).json({error:"User not a member"});
        if(user.likedProfiles.includes(userToLike))
           return res.status(400).json({error:"User already liked"});
        userToLike.likedBy.push({username:user.username,avatarUrl:user.avatarUrl,likedDate:Date.now()});

        // await userToLike.save();
        // await user.save();   //slow

        await Promise.all(user.save(),userToLike.save());
        res.status(200).json({message:"User Liked"})
        } catch (error) {
        res.status(500).json({error:error.messsage});
    }
}
export const getLikes=async(req,res)=>{
    try{
 const user=await User.findById(req.user._id);
  res.status(200).json({likedBy:user.likedBy});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}