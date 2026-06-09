import express from "express";
import dotenv from "dotenv"
dotenv.config();
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import websiteRouter from "./routes/website.route.js";
import paymentRouter from "./routes/payment.route.js";
import { stripeWebHook } from "./controller/stripeWebHook.js";

const PORTS = process.env.PORT || 8080
const app = express();

app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebHook)

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://web-craft-v92m.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/auth",authRoute);
app.use("/api/user",userRouter);
app.use("/api/website",websiteRouter);
app.use("/api/payment",paymentRouter);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORTS, () => {
      console.log(`Server running on port ${PORTS}`);
    });
  } catch (err) {
    console.log("Server startup error:", err);
  }
};

startServer();
