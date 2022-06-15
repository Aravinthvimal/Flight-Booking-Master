// package imports
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// module imports
import connectDB from "./utils/db.config.js";
import errHandler from "./utils/error.handler.js";
import bookingRouter from "./routes/booking.routes.js";
import seatsRouter from "./routes/seats.routes.js";
import authRouter from "./routes/auth.routes.js";

// initiate express
const app = express();

// add cors
app.use(cors());

// load env vars
dotenv.config();

// log requests
app.use(morgan("dev"));

// parse req body
app.use(express.json());

// parse url encoded form data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// connect to DB
connectDB();

// user routes
app.use("/user", bookingRouter);

// admin routes
app.use("/admin", seatsRouter);

// auth routes
app.use("/auth", authRouter);

// express error handler
app.use(errHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error : ${err}`);
  server.close(() => process.exit(1));
});
