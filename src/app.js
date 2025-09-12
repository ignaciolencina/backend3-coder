import express from "express";
import cookieParser from "cookie-parser";

import "./database/database.js";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.json({
    status: "success",
    message: "🐾 Pet Adoption API is running successfully!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    port: PORT,
    endpoints: {
      users: "/api/users",
      pets: "/api/pets",
      adoptions: "/api/adoptions",
      sessions: "/api/sessions",
      mocks: "/api/mocks",
    },
    documentation: "Use Postman or similar tools to test the API endpoints",
  });
});

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
