import express from "express";
import posts from "../data/posts.js";
import { index, show, remove } from "../controllers/postsControllers.js";

const postsRouter = express.Router();

// Index:
postsRouter.get("/", (index));

// Show:
postsRouter.get("/:id", (show));

//Create:
postsRouter.post("/", (request, response) => {
    response.json({ messagge: "Creation request" })
});

//Update:
postsRouter.put("/:id", (request, response) => {
    const id = request.params.id;
    const idNum = Number(id);
    response.json({ messagge: "Update request" })
});

//Delete:
postsRouter.delete("/:id", (remove));

export default postsRouter;