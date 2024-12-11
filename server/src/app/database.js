import mongoose from "mongoose";
import logger from "./logging.js";

const databaseConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.set("debug", (collectionName, method, query, doc) => {
      logger.info(
        `Mongoose Query - Collection: ${collectionName}, Method: ${method}, Query: ${JSON.stringify(
          query
        )}, Doc: ${JSON.stringify(doc)}`
      );
    });

    conn.connection.on("error", (err) => {
      logger.error(`Mongoose Connection Error: ${err.message}`);
    });

    conn.connection.on("disconnected", () => {
      logger.warn("Mongoose Disconnected");
    });

  } catch (error) {
    logger.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default databaseConnection;
