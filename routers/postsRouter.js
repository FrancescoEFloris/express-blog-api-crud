import express from "express";
import posts from "../data/posts.js";

const postsRouter = express.Router();

// Index: mostra la tutta la lista
postsRouter.get("/", (request, response) => {
    response.json(posts);
});

// Show: mostra solo quello che sto cercando
postsRouter.get("/:id", (request, response) => {
    const id = request.params.id;
    const idNum = Number(id);
    if (isNaN(idNum) || idNum <= 0) {
        response
            .status(404)
            .json({ error: "Id not Found" })
        return;
    }
    const thisPost = posts.find(post => {
        return post.id === idNum
    });
    response.json(thisPost)
});

//Create:
postsRouter.post("/", (request, response) => {
    response.json({ messagge: "Creation request" })
});

//Update:
postsRouter.put("/:id", (request, response) => {
    const id = request.params.id;
    const idNum = Number(id);
    // const thisPost = posts.find(post => {
    //    return post.id === idNum
    // });
    // const modifiedPost =

    response.json({ messagge: "Update request" })
});

postsRouter.delete("/:id", (request, response) => {
    const id = request.params.id;
    const idNum = Number(id);
    if (isNaN(idNum) || idNum <= 0) {
        response
            .status(404)
            .json({ error: "Id not Found" })
        return;
    }

    const thisPost = posts.find(post => {
        return post.id === idNum
    });

    if (!thisPost) {
        response
            .status(404)
            .json({ error: "Post not Found" });
        return;
    }

    const thisIndex = posts.indexOf(thisPost)
    posts.splice(thisIndex, 1);

    response.json({ messagge: "Post Deleted" })
});

export default postsRouter;