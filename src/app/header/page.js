'use client'
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { type } from "os";
import { Logout } from "@mui/icons-material";
import { logout } from "../redux/authSlice";

const Header = () => {
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch()

    console.log(userData, 'reduxUserData')

    const handleLogout = () => {

    console.log(dispatch(logout()))
    }


    return (
        <div className="flex bg-white z-10 shadow-md justify-between">
            <ul className="flex p-4 ">
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/about">About</Link></li>       
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/contact">Contact</Link></li> 
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/postspage">All Posts</Link></li>       
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/">Home</Link></li>       
            {userData ? 
            (
            <li className="p-2 px-4 bg-yellow-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/login">{userData.name}</Link></li>       
            )
            :
            (
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/login">Login</Link></li>       
            )
         }
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/write">Write</Link></li>       

            </ul>
            {userData ?
            (
            <ul className="flex p-4">
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><LogoutIcon
            onClick={handleLogout}/></li>       
            </ul>
            ) : ""
}
        </div>
    )

}

export default Header


