import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import { UserRouterOpt } from "./src/routes/userRoutes.js";
import { PORT } from "./src/config/config.js";
import { TaskRouterOpt } from "./src/routes/taskRoutes.js";
dotenv.config();
const app = express();


app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
  next();
});
const basePath = process.env.NODE_ENV === "test" ? "" : "/thebluebox";
app.use(`${basePath}`, UserRouterOpt());
app.use(`${basePath}`, TaskRouterOpt());
export default app;
if(process.env.NODE_ENV !== "test"){
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  }

