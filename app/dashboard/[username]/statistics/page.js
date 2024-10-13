"use client"
import Header from '@/app/components/header';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react'
import { useState, useEffect } from 'react';

export default function Statistics() {
    const [username, setUsername] = useState('');
    const [utmData, setUtmData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [dataFound, setDataFound] = useState(true)
    const utm = username; // Replace with actual UTM source value

    useEffect(() => {
        const fetchUtmData = async () => {
            setDataLoading(true)
            const response = await fetch('/api/utmdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ utm: username }),
            });
            const data = await response.json();
            data.length <= 0 ? setDataFound(false) : setDataFound(true);
            setDataLoading(false)
            setUtmData(data);
        };
        fetchUtmData();
    }, [utm]);

    useEffect(() => {
        // Get the username from cookies after the component has mounted
        const storedUsername = Cookies.get('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    // Conditionally render the content once the username is set
    if (!username) {
        return <div role="status" className="w-screen h-screen flex justify-center items-center">
            <svg aria-hidden="true" className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div> // Show a loading state until username is retrieved
    }
    let totalRevenue = 0;
    let totalRPM = 0;
    let totalUsers = 0;

    for (let i = 0; i < utmData.length; i++) {
        const element = utmData[i];
        totalRevenue += Number(element.revenue);
        totalRPM += Number(element.revenue);
        totalUsers += Number(element.users);
    }
    return (
        <>
            <Header />
            <h1 className='font-bold text-5xl text-white text-center m-4'>Statistics</h1>
            <div className="w-[80vw] mx-auto mt-4 relative shadow-md sm:rounded-lg">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Campaign Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Revenue
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    RPM
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Active Users
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataLoading &&
                                <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td colSpan={"5"} className="px-6 py-4">
                                        <div className="w-full flex justify-center items-center">
                                            <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            }
                            {!dataFound &&
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th colSpan={"5"} scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                        No Data Available Yet!
                                    </th>
                                </tr>
                            }
                            {utmData.map((item, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.campaign}
                                        </td>
                                        <td className="px-6 py-4">
                                            {`$${item.revenue}`}
                                        </td>
                                        <td className="px-6 py-4">
                                            $29
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.users}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="font-semibold text-gray-900 dark:text-white">
                                <th colSpan={"2"} scope="row" className="px-6 py-3 text-base">Total</th>
                                <td className="px-6 py-3">${totalRevenue}</td>
                                <td className="px-6 py-3">$29</td>
                                <td className="px-6 py-3">{totalUsers}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}
