import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const token = req.cookies.get('token')?.value;
    const url = req.nextUrl.clone();

    if (url.pathname === '/login' && token) {
        try {
            const { payload } = await jwtVerify(token, secret);
            const username = payload.username;

            // Redirect to /dashboard/[username]
            url.pathname = `/dashboard/${username}`;
            const response = NextResponse.redirect(url);

            // Set the username in a cookie
            response.cookies.set('username', username, {
                httpOnly: false, // Allow access from client-side JavaScript
                secure: process.env.NODE_ENV === 'development',
                sameSite: 'strict',
                path: '/',
            });

            return response;
        } catch (err) {
            return NextResponse.next();
        }
    }

    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token) {
        try {
            const { payload } = await jwtVerify(token, secret);
            const username = payload.username;

            const response = NextResponse.next();
            response.cookies.set('username', username, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'development',
                sameSite: 'strict',
                path: '/',
            });

            if (url.pathname === `/dashboard` || url.pathname === `/dashboard/${username}`) {
                return response;
            } else if (url.pathname.startsWith(`/dashboard/${username}`)) {
                // Allow access to subpages like /utmlinks
                return response;
            } else {
                url.pathname = `/dashboard/${username}`;
                return NextResponse.redirect(url);
            }
        } catch (err) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/dashboard/:username/utmlinks'],
};
