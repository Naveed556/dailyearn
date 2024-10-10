import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find({}).lean();

        if (!users || users.length === 0) {
            return NextResponse.json({ message: 'No Users Found' }, {
                headers: { 'Cache-Control': 'no-store, must-revalidate' },
            });
        }

        return NextResponse.json(users, {
            headers: { 'Cache-Control': 'no-store, must-revalidate' },
        });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 }, {
            headers: { 'Cache-Control': 'no-store, must-revalidate' },
        });
    }
}
