import express from "express";
import postsRouter from "./routers/postsRouter.js";

const port = process.env.SERVER_PORT || 3000;
const app = express();
app.use(express.json());
app.use("/posts", postsRouter);

app.listen(port, (error) => {
    if (error) {
        console.error("The server could not start");
        return;
    }
    console.log(`Port: ${port}`);;

});