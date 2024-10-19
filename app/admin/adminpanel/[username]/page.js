"use client"
import React from 'react'
import AdminHeader from '@/app/components/adminheader'

const UserStats = ({params}) => {
    const user = params.username;
    return (
        <>
            <AdminHeader />
            <div>
                This is Stats of {user}
            </div>
        </>
    )
}

export default UserStats
