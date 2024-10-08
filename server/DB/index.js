import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://aarifraza:raza@cluster0.t6rkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(
      `Connection Successfully ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Connection Failed " + error);
  }
};

export {connectDB};
