import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// cors configurations
const corsOrigin = process.env.CORS_ORIGIN?.trim();
const corsOptions = {
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

if (!corsOrigin || corsOrigin === "*") {
  corsOptions.origin = (origin, callback) => callback(null, true);
} else {
  corsOptions.origin = corsOrigin.split(",").map((o) => o.trim());
}

app.use(cors(corsOptions));

//  import the routes

import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/projects/:projectId/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Welcome to TaskFlow API");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    statusCode,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    success: false,
  });
});

export default app;
