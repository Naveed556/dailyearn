import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(request) {
    const { username, password } = await request.json();

    // Connect to the database
    await dbConnect();
    const user = new User({ username: username, password: bcrypt.hashSync(password, 10) })
    user.save()

    return NextResponse.json({ message: `New User Added with username: ${username}` })
}