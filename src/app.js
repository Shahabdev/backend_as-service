import express from "express";
import cookieParser  from "cookie-parser";
import cors from "cors";


const app =  express();
app.use(cors({
    origin : "*",
    crendetials : true
}));

app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended : true,limit:"16kb"}));
app.use(express.static("public0"));
app.use(cookieParser());


export { app };