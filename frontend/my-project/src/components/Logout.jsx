import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
// TODO Implement Logout functionality


const Logout = () => {
	const {authUser,setAuthUser}=useAuthContext();
	const handleLogOut=async()=>{
         try {
			const res=await fetch("/api/auth/logout",{credentials:"include"});
			const data=await res.json();
			setAuthUser(null);
			console.log(data);
			console.log(authUser);
		} catch (error) {
			toast.error(error.message);
		}
	}
	return (
		<>
			<img
				src={authUser?.avatarUrl}
				className='w-10 h-10 rounded-full border border-gray-800'
			/>

			<div className='cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800'>
				<MdLogout size={22} 
				onClick={handleLogOut}/>
			</div>
		</>
	);
};
export default Logout