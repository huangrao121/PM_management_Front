import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the middleware function
export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token"); // Replace "authToken" with your cookie name
    // If the cookie does not exist, redirect to /login
    if (!token) {
        console.log("middleware has problem")
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if(token){
        try{
            const response = await fetch(`http://localhost:8888/api/me`, { // Fixed URL format
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token.value}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
    
            const res = await response.json();
            if (res.response_key != "SUCCESS") {
                console.log("middleware has problem")
                return NextResponse.redirect(new URL("/login", request.url));
            }
        } catch (error) {
            console.log("middleware has verification problem")
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Continue to the requested page if the cookie exists
    return NextResponse.next();
}

// Specify the paths where the middleware should apply
export const config = {
    matcher: ['/((?!login|signup|_next|favicon.ico|api|logo.svg).*)'], // Replace with your protected routes
};