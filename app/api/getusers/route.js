import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    // Connect to the database
    await dbConnect();
    const users = await User.find({});
    if (!users) {
        return NextResponse.json({ message: 'No Users Found' });
    }
    return NextResponse.json(users)
}