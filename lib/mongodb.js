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
    // Check the connection state:
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (cached.conn && mongoose.connection.readyState === 1) {
        // Use existing connection if available and active
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,  // Ensure Mongoose doesn't buffer operations in case of a reconnection delay
            useNewUrlParser: true,  // Updated to remove deprecated options
            useUnifiedTopology: true,
        };

        // Establish a new connection and store the promise
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
