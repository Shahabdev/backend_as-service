import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
app.use(cors({
    origin: "*",
    crendetials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public0"));
app.use(cookieParser());


/// --- import routes ----------->
import userRoute from "./routes/user.routes.js"
import projectRoute from "./routes/project.routes.js"
import collectionRoute from "./routes/collection.routes.js"

app.use("/api/v2/users", userRoute);
app.use("/api/v2/project", projectRoute);
app.use("/api/v2/collection", collectionRoute);

export { app };