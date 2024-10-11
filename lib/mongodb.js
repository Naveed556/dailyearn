import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }

async function dbConnect() {
    // if (cached.conn) {
    //     return cached.conn;
    // }

    // if (!cached.promise) {
    //     const opts = {
    //         bufferCommands: false,
    //     };

    //     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    //         return mongoose;
    //     });
    // }
    // cached.conn = await cached.promise;
    // return cached.conn;
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to Mongodb")
    } catch (error) {
        console.log("Error Connecting to Mongodb:",error)
    }
}

export default dbConnect;
