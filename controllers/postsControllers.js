import posts from "../data/posts.js";

//Index:
function index(request, response) {
    const filteredTag = request.query.tag;

    if (!filteredTag) {
        response.json(posts);
    } else {
        const filteredPosts = posts.filter(post => {
            for (let i = 0; i < post.tags.length; i++) {
                if (post.tags[i].toLowerCase() === filteredTag.toLowerCase()) {
                    return true;
                }
            }
            return false;
        });
        response.json(filteredPosts);
    }
}

//Show:
function show(request, response) {
    const id = request.params.id;
    const idNum = Number(id);
    if (isNaN(idNum) || idNum <= 0) {
        response
            .status(400)
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
            .status(400)
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

    response
        .status(204)
        .json({ messagge: "Post Deleted" })
};

export {
    index,
    show,
    remove
};