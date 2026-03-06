import express from "express";
import foldersRouter from "./api/folders.js";
import filesRouter from "./api/files.js";

const app = express();

app.use(express.json());
app.use("/folders", foldersRouter);
app.use("/files", filesRouter);

app.get("/", function (request, response) {
  response.send("Filez API is running.");
});

app.use(function (request, response) {
  response.status(404).send("Route not found.");
});

app.use(function (error, request, response, next) {
  if (error.code === "23505") {
    return response.status(409).send("That file already exists in this folder.");
  }

  response.status(error.status ?? 500).send(error.message ?? "Server error.");
});

export default app;
