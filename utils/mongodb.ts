import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        try {
            const options = {
                autoIndex: true, // Don't build indexes
                maxPoolSize: 10, // Maintain up to 10 socket connections
                serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
                socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
                family: 4 // Use IPv4, skip trying IPv6
            };

            cached.promise = mongoose.connect(`${MONGODB_URI}`, options).then(mongoose => mongoose);
            console.log('Server connected to MongoDb');
        } catch (error) {
            console.log(error);
        }
    }

    cached.conn = await cached.promise;
    return cached.conn
}

export default connect;