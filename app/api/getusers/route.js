import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    // Connect to the database
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected, fetching users...');
    try {
        const users = await User.find({}).lean();
        if (!users || users.length === 0) {
            return NextResponse.json({ message: 'No Users Found' });
        }

        // Create the response object and set Cache-Control header
        const response = NextResponse.json(users);
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching users', details: error.message }, { status: 500 });
    }
}

