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
