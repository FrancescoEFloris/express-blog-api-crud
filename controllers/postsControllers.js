import posts from "../data/posts.js";

//Index:
function index(request, response) {
    response.json(posts);
};

//Show:
function show(request, response) {
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
};

//Delete:
function remove(request, response) {
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
};

export {
    index,
    show,
    remove
};