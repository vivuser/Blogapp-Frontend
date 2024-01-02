"use client"
import { NextResponse } from "next/server";
import { useSelector } from "react-redux";

function middleware(request) {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    console.log('IsAuthenticated:', isAuthenticated);
    if (!isAuthenticated) {
        console.log(isAuthenticated, 'check if authenticated')
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