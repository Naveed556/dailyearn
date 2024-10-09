import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    // Connect to the database
    await dbConnect();
    const users = await User.find({}).lean();
    if (!users) {
        return NextResponse.json({ message: 'No Users Found' });
    }
    // Create the response object and set Cache-Control header
    const response = NextResponse.json(users);

    // Set Cache-Control to no-store to prevent caching
    response.headers.set('Cache-Control', 'no-store');
    return response;
    // return NextResponse.json(users)
}