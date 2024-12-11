import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./src/app/database.js";
import userRoute from "./src/routes/userRoute.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import logger from "./src/app/logging.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/users", userRoute);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  databaseConnection();
  logger.info(`Starting server on port ${PORT}`);
});
