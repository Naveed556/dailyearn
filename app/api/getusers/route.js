import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Connect to the database
        await dbConnect();

        // Fetch users from the database
        const users = await User.find({}).lean();

        // Disconnect from the database after query
        await mongoose.disconnect();

        // Return the fetched users
        if (users.length === 0) {
            return NextResponse.json({ message: 'No Users Found' });
        }

        return NextResponse.json(users);
    } catch (error) {
        // Handle errors and disconnect in case of a failure
        await mongoose.disconnect();
        return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
    }
}
