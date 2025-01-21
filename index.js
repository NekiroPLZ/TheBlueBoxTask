import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Importado una sola vez
import { userService } from "./src/services/userService.js";
import { userModel } from "./src/models/UserModels.js";
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

app.use("/thebluebox", UserRouterOpt());
app.use("/thebluebox", TaskRouterOpt());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
