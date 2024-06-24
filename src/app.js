import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/errorHandler.js"; // Adjust the path as needed

const app = express();

app.use(cors({ origin: "http://127.0.0.1:3000", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/api/v1/", (req, res) => {
  res.send("Hello, You Are Connect To Server 🔥");
});

// Import Routers
import userRouter from "./routes/user.routes.js";
app.use("/users", userRouter);

import ticketRouter from "./routes/ticket.routes.js";
app.use("/tickets", ticketRouter);

// Error-handling middleware should be the last piece of middleware
app.use(errorHandler);

export { app };
