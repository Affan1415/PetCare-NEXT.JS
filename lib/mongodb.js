// lib/mongodb.js
import { MongoClient } from 'mongodb';

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function connectToDatabase() {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    console.log("connection successfull")
    return { db };
}
