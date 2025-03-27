import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the middleware function
export function middleware(request: NextRequest) {
    const token = request.cookies.get("token"); // Replace "authToken" with your cookie name

    // If the cookie does not exist, redirect to /login
    if (!token) {
        console.log("middleware has problem")
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Continue to the requested page if the cookie exists
    return NextResponse.next();
}

// Specify the paths where the middleware should apply
export const config = {
    matcher: ["/"], // Replace with your protected routes
};