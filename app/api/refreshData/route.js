import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request) {
    try {
        await dbConnect();
        const { username, payments } = await request.json();
        const user = await User.findOne({ username: username });
        let userPayments = user.payments;
        userPayments.map(item => {
            const match = payments.find(item1 => item1.dateRange === item.dateRange);
            if (match) {
                item.revenue = match.revenue
            }
        })
        if (payments.length > userPayments.length) {
            for (let i = userPayments.length; i < payments.length; i++) {
                const newarray = payments[i];
                newarray["isPaid"]=false;
                userPayments.push(newarray)
                console.log(userPayments);
            }
        }
        const currentRevenue = payments.reduce((total, item) =>total + Number(item.revenue), 0);
        user.currentRevenue = currentRevenue
        await user.save();
        return NextResponse.json({message : "Data Refreshed!"});
    } catch (error) {
        return NextResponse.json({ error: `Error fetching users: ${error.message}` }, { status: 500 });
    }
}