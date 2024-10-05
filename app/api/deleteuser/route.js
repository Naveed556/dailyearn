import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const { _id, username } = await request.json();

    // Connect to the database
    await dbConnect();
    const user = await User.deleteOne({ _id: _id });
    if (!user) {
        return NextResponse.json({ message: 'No User Found to Delete' });
    }
    return NextResponse.json({ message: `User ${username} is Deleted Successfully` })
}