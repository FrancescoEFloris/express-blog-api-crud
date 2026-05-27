function errorsHandler(error, request, response, next) {
    console.log(error); // per vedere in console quale sia l'errore
    
    response
        .status(500)
        .json({ error: "Error" })


};

export default errorsHandler;