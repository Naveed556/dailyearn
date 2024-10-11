"use client"

import React from 'react'
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react'
import AdminHeader from '@/app/components/adminheader'

const Admimpanel = () => {
    const [usersList, setUsersList] = useState([]);
    const [hideAddUser, setHideAddUser] = useState(true);
    const [hideDelPanel, setHideDelPanel] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(usersList);

    useEffect(() => {
        getUsers();
        console.log("Fetching Users")
    }, [])
    // Filter table data based on search term
    useEffect(() => {
        const results = usersList.filter((row) =>
            row.username.toLowerCase().includes(searchTerm.toLowerCase())// ||
            // row.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(results);
    }, [searchTerm, usersList]);

    // Handle search input change
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const getUsers = async () => {
        const req = await fetch(`/api/getusers`, {
            next: {
                tags: ['users'], // Invalidate with revalidateTag('users') on-demand
                revalidate: 300, // 5 min
            },
        });
        const res = await req.json();
        setUsersList(res);
        setFilteredData(res);
        console.log(res);
    }

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        // console.log(data);
        const req = await fetch("/api/adduser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const res = await req.json();
        if (!req.ok) {
            setError("formErrors", { message: res.error })
        } else {
            setHideAddUser(true);
        }
        getUsers();
    }

    const deleteUser = async (i) => {
        const req = await fetch("/api/getusers");
        const res = await req.json();
        // console.log(res[i]);
        await fetch("/api/deleteuser", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(res[i])
        });
        getUsers();
    }

    return (
        <>
            <AdminHeader />
            <main className="relative">
                <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Dashboard Admin’s Panel</h1>
                <div className="w-[80vw] mx-auto mt-4 relative shadow-md sm:rounded-lg">
                    <div className="bg-white dark:bg-gray-900 flex justify-between items-center flex-wrap gap-2 p-1">
                        <div className="relative mx-1 w-1/2">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input value={searchTerm} onChange={handleSearch} type="text" className="py-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                        </div>
                        <button onClick={() => { setHideAddUser(false) }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Add User
                        </button>

                        <div className={`bg-[#37415180] ${hideAddUser ? "hidden" : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full`}>
                            <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Add New User Credentials
                                        </h3>
                                        <button onClick={() => { setHideAddUser(true) }} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-5">
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                            <div>
                                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                                <input type="text" onBeforeInput={() => { clearErrors("formErrors") }} {...register("username", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Username" />
                                            </div>
                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <input type="text" onBeforeInput={() => { clearErrors("formErrors") }} {...register("password", { required: true })} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                            </div>
                                            {errors.formErrors && <span className='text-red-600 font-bold'>{errors.formErrors.message}</span>}
                                            {!isSubmitting &&

                                                <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New User</button>
                                            }
                                            {isSubmitting &&

                                                <button disabled type="button" className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center">

                                                    <svg role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                                    </svg>
                                                    Adding...
                                                </button>
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
                        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Revenew
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created At
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => {
                                    return (<tr key={index} className={`text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${hideDelPanel ? "hover:bg-gray-50 dark:hover:bg-gray-600" : ""}`}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.username}
                                        </th>
                                        <td className="px-6 py-4">
                                            $29
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.createdAt.split("T")[0]}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => { setHideDelPanel(false) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    colors="primary:#ff0000"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </button>
                                            <div className={`bg-[#37415130] ${hideDelPanel ? "hidden" : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}>
                                                <div className="h-screen flex items-center justify-center relative p-4 w-full max-w-md md:h-auto">
                                                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                                        <button onClick={() => { setHideDelPanel(true) }} className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                        <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                                                        <div className="flex justify-center items-center space-x-4">
                                                            <button data-modal-toggle="deleteModal" onClick={() => { setHideDelPanel(true) }} className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                                                No, cancel
                                                            </button>
                                                            <button onClick={() => { deleteUser(index); setHideDelPanel(true) }} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                                Yes, I am sure
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>)

                                })}

                            </tbody>
                        </table>

                    </div>
                </div>

            </main>
        </>
    )
}

export default Admimpanel
