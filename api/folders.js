import express from "express";
import { getAllFolders, getFolderById } from "../db/folders.js";
import { createFile } from "../db/files.js";

const foldersRouter = express.Router();

foldersRouter.get("/", async function (request, response, next) {
  try {
    const folders = await getAllFolders();
    response.send(folders);
  } catch (error) {
    next(error);
  }
});

foldersRouter.get("/:id", async function (request, response, next) {
  try {
    const folderId = Number(request.params.id);

    if (Number.isNaN(folderId)) {
      return response.status(400).send("Folder id must be a number.");
    }

    const folder = await getFolderById(folderId);

    if (!folder) {
      return response.status(404).send("Folder not found.");
    }

    response.send(folder);
  } catch (error) {
    next(error);
  }
});

foldersRouter.post("/:id/files", async function (request, response, next) {
  try {
    const folderId = Number(request.params.id);

    if (Number.isNaN(folderId)) {
      return response.status(400).send("Folder id must be a number.");
    }

    const folder = await getFolderById(folderId);

    if (!folder) {
      return response.status(404).send("Folder not found.");
    }

    if (!request.body || Object.keys(request.body).length === 0) {
      return response.status(400).send("Request body is required.");
    }

    const name = request.body.name;
    const size = request.body.size;

    if (typeof name !== "string" || name.trim() === "") {
      return response.status(400).send("Name is required.");
    }

    if (!Number.isInteger(size) || size < 0) {
      return response.status(400).send("Size must be a non-negative integer.");
    }

    const newFile = await createFile(name, size, folderId);
    response.status(201).send(newFile);
  } catch (error) {
    next(error);
  }
});

export default foldersRouter;
