function notFound(request, response, next) {
        response
            .status(404)
            .json({ error: "Not Found" })
};

export default notFound;