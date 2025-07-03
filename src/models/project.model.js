
import mongoose, { Schema } from "mongoose";


const ProjectSchema = Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    name : {
        type : String,
        required : true
    },
    collections : [
        {
            type : Schema.Types.ObjectId,
            ref : "Collection"
        }
    ]
}, { timestamps : true});

export  const Project = mongoose.model("Project",ProjectSchema);