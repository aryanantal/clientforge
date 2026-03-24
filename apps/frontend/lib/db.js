// apps/frontend/lib/db.js

import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cached.promise) {
    return cached.promise;
  }

  const opts = {
    bufferCommands: false,
  };

  cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
    console.log("MongoDB Connected");
    return mongoose;
  });

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
