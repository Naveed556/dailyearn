"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';

const AdminHeader = () => {
    const router = useRouter();
    const [hideSignout, setHideSignout] = useState(true)
    const handleLogout = async () => {
        try {
            // Make a request to the logout API route
            await fetch('/api/adminlogout', {
                method: 'GET',
            });
            toast('You have been Signed Out!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            // Redirect to login or home page after successful logout
            router.push('/admin');
        } catch (err) {
            console.error('Failed to logout:', err);
        }
    };
    return (
        <>
            <header>
                <nav className="border-gray-200 bg-gray-900">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Image src="https://flowbite.com/docs/images/logo.svg" className="w-auto h-auto" alt="Logo" width="32" height="32" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Admin Panel</span>
                        </Link>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button onClick={() => { setHideSignout(false) }} className="inline-flex items-center text-white focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-4 py-2 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800">
                                Sign Out
                                <lord-icon
                                    src="https://cdn.lordicon.com/vduvxizq.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ "width": "25px", "height": "25px" }}>
                                </lord-icon>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            <div className={`bg-[#37415130] ${hideSignout ? "hidden" : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}>
                <div className="h-screen flex items-center justify-center relative p-4 w-full max-w-md md:h-auto">
                    <div className="relative p-4 text-center rounded-lg shadow bg-gray-800 sm:p-5">
                        <button onClick={() => { setHideSignout(true) }} className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <svg className="text-gray-500 w-11 h-11 mb-3.5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                        </svg>
                        <p className="mb-4 text-gray-300">Are you sure you want to Sign Out</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={() => { setHideSignout(true) }} className="py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">
                                No, cancel
                            </button>
                            <button onClick={() => { handleLogout(); setHideSignout(true) }} className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-red-500 hover:bg-red-600 focus:ring-red-900">
                                Yes, I am sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHeader
