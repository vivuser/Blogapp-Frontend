import Link from "next/link"

const Header = () => {

    return (
        <div className="flex bg-gray-100">
            <ul className="flex p-4 z-10 ">
            <li className="p-2"><Link href="/about">About</Link></li>       
            <li className="p-2"><Link href="/contact">Contact</Link></li> 
            <li className="p-2"><Link href="/postspage">All Posts</Link></li>       
            <li className="p-2"><Link href="/content">Content</Link></li>   
            <li className="p-2"><Link href="/">Home</Link></li>       
            <li className="p-2"><Link href="/login">Login</Link></li>       
            </ul>
        </div>
    )

}

export default Header


