import mongoose from "mongoose"

let connected = false

const connectDB = async () => {
  mongoose.set("strictQuery", true)

  // If the database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is already connected...")
    return
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI || "")
    connected = true
    console.log("MongoDB connected...")
  } catch (error) {
    console.log(error)
  }
}

// const connectDB = async () => {
//     try {
//       const connectionInstance = await mongoose.connect(
//         `${process.env.MONGODB_URI}/${DB_NAME}`
//       );
//       console.log(
//         `\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
//       );
//     } catch (error) {
//       console.log("MongoDB connection error", error);
//       process.exit(1);
//     }
//   };

export default connectDB
