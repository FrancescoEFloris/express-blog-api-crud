function itemIdSearch(request, response) {
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

    request.thisPost = thisPost;
    next();
}

export default itemIdSearch;