import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json';


const app = express();
app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/api/v1/", (req, res) => {
    res.send("Hello, You Are Connect To Server 🔥");
});
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Import Router
import userRouter from "./routes/user.routes.js";
app.use("/users", userRouter);


import ticketRouter from "./routes/ticket.routes.js";

app.use("/tickets", ticketRouter);





export { app };