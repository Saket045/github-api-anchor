/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FaHeart } from 'react-icons/fa6'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const LikeProfile = ({userProfile}) => {
    const authUser=useAuthContext();
    // const ownProfile=authUser?.username===userProfile.login;
    const handleLikeProfile=async()=>{
           try {
            const res = await fetch(`/api/users/like/${userProfile.login}`, {
				method: "POST",
				credentials: "include",
			});
            const data=await res.json();
            if(data.error) throw new Error(data.error)
                toast.success(data.message)

       } catch (error) {
            toast.error(error.message)
           }
    }
    if(!authUser)
        return null;

  return (
    <div>
      <button className='bg-glass font-medium w-full text-xs py-2 px-6 rounded-md cursor-pointer border
       border-blue-400 flex items-center gap-2'
       onClick={handleLikeProfile}
		>
            <FaHeart size={16} /> Like Profile</button>
    </div>
  )
}

export default LikeProfile
