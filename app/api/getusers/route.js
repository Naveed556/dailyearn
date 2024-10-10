import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log('Attempting to connect to the database...');
        await dbConnect();

        console.log('Connected to the database. Fetching users...');
        const users = await User.find({}).lean();
        
        if (!users || users.length === 0) {
            console.log('No users found.');
            return NextResponse.json({ message: 'No Users Found' });
        }

        console.log('Users fetched successfully:', users);
        return NextResponse.json(users);
    } catch (error) {
        // Log full error object for debugging
        console.error('Error fetching users:', error);
        return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
    }
}
