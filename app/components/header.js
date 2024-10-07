"use client"
import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

const Header = () => {
    // Assuming username is stored in cookies
    const [username, setUsername] = useState('');
    const router = useRouter();
    const currentPath = usePathname();

    // Fetch username from cookies on client-side
    useEffect(() => {
        const storedUsername = Cookies.get('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = async () => {
        try {
            // Make a request to the logout API route
            await fetch('/api/logout', {
                method: 'GET',
            });
            // Redirect to login or home page after successful logout
            router.push('/login');
        } catch (err) {
            console.error('Failed to logout:', err);
        }
    };
    return (
        <header className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 md:flex-row items-center justify-between">
                <Link href={"http://localhost:3000/"} className="flex title-font font-medium items-center text-white md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">Dashboard</span>
                </Link>

                {(currentPath == "/login" || currentPath == "/") &&
                    <Link href={"/login"} className='md:ml-auto flex flex-wrap items-center justify-center'>
                        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base  md:mt-0">Go to Dashboard
                            <lord-icon
                                src="https://cdn.lordicon.com/vduvxizq.json"
                                trigger="hover"
                                colors="primary:#9ca3af"
                                style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>
                        </button>
                    </Link>
                }

                {!(currentPath == "/login" || currentPath == "/") &&
                    <>
                        <nav className="md:ml-auto hidden md:flex flex-wrap items-center text-base justify-center">
                            <Link href={`/dashboard/${username}`} className="mr-5 hover:text-white">Dashboard</Link>
                            <Link href={`/dashboard/${username}/utmlinks`} className="mr-5 hover:text-white">UTM-Links</Link>
                            <Link href={`/dashboard/${username}/utmgenerator`} className="mr-5 hover:text-white">UTM Generator</Link>
                        </nav>
                        <button onClick={() => { handleLogout() }} className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base  md:mt-0">Log Out
                            <lord-icon
                                src="https://cdn.lordicon.com/vduvxizq.json"
                                trigger="hover"
                                colors="primary:#9ca3af"
                                style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>
                        </button>
                    </>
                }

            </div>
        </header>
    )
}

export default Header
