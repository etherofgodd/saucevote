import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.PROD_MONGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    connect &&
      console.log(
        `mongodb connect at ${connect.connection.host}:: ${connect.connection.port}`
          .cyan.italic
      );
  } catch (error) {
    console.error(`ERROR: ${error.message}`.red.bold);
    process.exit(1);
  }
};
