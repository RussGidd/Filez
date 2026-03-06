import express from "express";
import { getAllFiles } from "../db/files.js";

const filesRouter = express.Router();

filesRouter.get("/", async function (request, response, next) {
  try {
    const files = await getAllFiles();
    response.send(files);
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
