import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const admin = await Admin.findOne();
    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { username, enableDashboard } = await request.json();
    await dbConnect();
    const admin = await Admin.findOne({ username });
    admin.enableDashboard = enableDashboard;
    await admin.save();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
