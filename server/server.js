import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./src/app/database.js";
import userRoute from "./src/routes/userRoute.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import logger from "./src/app/logging.js";
import path from "path";

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

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  databaseConnection();
  logger.info(`Starting server on port ${PORT}`);
});
