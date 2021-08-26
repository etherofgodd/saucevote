import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./utils/connectDb.js";
import morgan from "morgan";
import routes from "./routes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(cors());
app.use(morgan("dev"));

// routes
routes(app);

// Home route
app.get("/", (req, res) =>
  res.json({
    note: "Welcome",
    message: "Welcome to the future of voting",
  })
);

const date = new Date(1999, 3, 22);

console.log(date);

// server
app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`.blue.italic)
);

app.use(notFound);
app.use(errorHandler);
