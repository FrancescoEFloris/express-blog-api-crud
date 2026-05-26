import express from "express";
import posts from "../data/posts.js";
import { index, show, remove, create } from "../controllers/postsControllers.js";

const postsRouter = express.Router();

// Index:
postsRouter.get("/", (index));

// Show:
postsRouter.get("/:id", (show));

//Update:
postsRouter.put("/:id", (request, response) => {
    const id = request.params.id;
    const idNum = Number(id);
    response.json({ messagge: "Update request" })
});

//Create:
postsRouter.post("/", (create));
/* CreateTry:
{
  "title": "Banana",
  "content": "Sbuccia e mangia!",
  "image": "/imgs/posts/banana.jpeg",
  "tags": ["Ricette vegetariane", "Frutta"],
  "slug": "banana",
  "published": true,
  "prep_time": 20
}
*/

//Delete:
postsRouter.delete("/:id", (remove));

export default postsRouter;