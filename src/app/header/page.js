'use client'
import Link from "next/link"
import { useUser } from "../../../context/UserContext"
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const userName = useSelector((state) => {
        console.log(state, 'gg')
        state.userData
    })



    console.log(userName)
    const dispatch = useDispatch()


    return (
        <div className="flex bg-white z-10 shadow-md">
            <ul className="flex p-4 ">
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/about">About</Link></li>       
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/contact">Contact</Link></li> 
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/postspage">All Posts</Link></li>       
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/">Home</Link></li>       
            {userName ? 
            (
            <li className="p-2 px-4 bg-yellow-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/login">{userName}</Link></li>       
            )
            :
            (
            <li className="p-2 px-4 bg-slate-200 rounded-lg text-md font-bold hover:bg-cyan-100 m-2"><Link href="/login">Login</Link></li>       
            )
         }
            </ul>
        </div>
    )

}

export default Header


