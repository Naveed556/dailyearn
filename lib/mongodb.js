import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        // Clear existing cache and reconnect
        console.log('Disconnecting the current connection');
        await mongoose.disconnect();
        cached.conn = null;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        console.log('Creating a new database connection');
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    
    cached.conn = await cached.promise;
    console.log('New database connection established');
    return cached.conn;
}

export default dbConnect;
