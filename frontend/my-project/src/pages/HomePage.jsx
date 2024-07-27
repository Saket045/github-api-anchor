/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import Search from '../components/Search'
import SortRepos from '../components/SortRepos'
import ProfileInfo from '../components/ProfileInfo.jsx'
import Repos from '../components/Repos'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner.jsx'

const HomePage = () => {
  const [userProfile,setUserProfile]=useState(null);
  const [repos,setRepos]=useState([]);
  const [loading,setLoading]=useState(false);
  const [sortType,setSortType]=useState("forks");

const getUserProfileAndRepos=useCallback( async(username="burakorkmez")=>{
    setLoading(true);
    try {
      const userRes=await fetch(`https://api.github.com/users/${username}`);
      const userProfile=await userRes.json();
      setUserProfile(userProfile);
      const repoRes=await fetch(userProfile.repos_url);
      const repos=await repoRes.json();
      setRepos(repos);
      console.log("userProfile",userProfile);
      console.log("repos",repos);
      return {userProfile,repos};
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  },[]
)

  useEffect(()=>{
    getUserProfileAndRepos();
  },[getUserProfileAndRepos])

  const onSearch=async(e,username)=>{
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
   const {userProfile,repos}= await getUserProfileAndRepos(username);
   setUserProfile(userProfile);
   setRepos(repos);
   setLoading(false);
   setSortType("recent");
  }
  const onSort=(sortType)=>{
          if(sortType==="recent")
            repos.sort((a,b)=> new Date(b.created_at)-new Date(a.created_at));
  
  else if(sortType==="stars")
    repos.sort((a,b)=> new Date(b.stargazers_count)-new Date(a.stargazers_count));
  else if(sortType==="forks")
    repos.sort((a,b)=> new Date(b.forks_count)-new Date(a.forks_count));
  setSortType(sortType);
  setRepos([...repos]);
  }

  return (
    <div>
    <Search onSearch={onSearch}/>
    {repos.length > 0 && <SortRepos sortType={sortType} onSort={onSort}/>}
    
    <div>
     {userProfile && !loading && <ProfileInfo userProfile={userProfile}/>} 
     {!loading && <Repos repos={repos}/>} 
      {loading && <Spinner/>}
    </div>
    </div>
  )
}

export default HomePage
