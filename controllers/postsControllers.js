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
    if (!thisPost) {
        response
            .status(404)
            .json({ error: "Post not Found" });
        return;
    }

    response.json(thisPost)
};

//Create:
function create(request, response) {
    const createId = posts[posts.length - 1].id + 1;
    const { title, content, image, tags, slug, published, prep_time } = request.body;

    if (!title || !content) {
        response
            .status(400)
            .json({ error: "Title or Content missing" });
        return;
    } else {
        const newPost = {
            id: createId,
            title,
            content,
            image: image || "/imgs/posts/placeHolder.jpg",
            tags: tags || [],
            slug: slug || title.toLowerCase(), // se metti spazi o simboli nel titolo devi vergognarti
            published: true,
            prep_time: Number(prep_time) || 0,
            created_at: Date.now(),
        };
        posts.push(newPost);
        response
            .status(201)
            .json({ message: "Post received!", });
    }
};

//Update:
function update(request, response) {
    const id = request.params.id;
    const idNum = Number(id);
    const thisPost = posts.find(post => post.id === idNum);
    if (!thisPost) {
        response
            .status(404)
            .json({ error: "Post not Found" });
        return;
    }

    const { title, content, image, tags, slug, published, prep_time } = request.body;
    const thisIndex = posts.indexOf(thisPost);
    const updatedPost = {
        ...thisPost,
        title: title || thisPost.title,
        content: content || thisPost.content,
        image: image || thisPost.image,
        tags: tags || thisPost.tags,
        slug: slug || thisPost.slug,
        published: published !== undefined ? published : thisPost.published,
        prep_time: prep_time || thisPost.prep_time
    };
    posts[thisIndex] = updatedPost;
    response
        .status(200)
        .json({ message: "Post aggiornato con successo" });
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
        .json({ message: "Post Deleted" })
};

export {
    index,
    show,
    create,
    update,
    remove
};