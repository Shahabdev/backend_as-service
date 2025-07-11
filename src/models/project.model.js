
import mongoose, { Schema } from "mongoose";


const ProjectSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },

    collections: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: "Collection"
            },
            collectionName: {
                type: String
            }
        }
    ]
}, { timestamps: true });

export const Project = mongoose.model("Project", ProjectSchema);