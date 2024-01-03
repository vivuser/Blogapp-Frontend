import { NextResponse } from "next/server";
import  store from "./app/redux/store";

async function middleware(request) {
    console.log('running')

    const reduxStore = store.getState();
    const isWritePath = request.url.pathname === '/write';
    const isLoginPage = request.url.pathname === '/login';

    const isAuthenticated = reduxStore.auth.isAuthenticated;
    console.log('IsAuthenticated:', isAuthenticated);
    if (!isAuthenticated && !isLoginPage &&  isWritePath) {
        console.log(isAuthenticated, 'check if authenticated', isWritePath, isLoginPage)
        console.log('IsAuthenticated:', isAuthenticated);
console.log('IsWritePath:', isWritePath);
console.log('IsLoginPage:', isLoginPage);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next()
}

module.exports = { 
    middleware,
    config: {
        matcher: '/write'
    }
};