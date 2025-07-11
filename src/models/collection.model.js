import mongoose, { Schema } from "mongoose";
const DocumentSubSchema = new Schema({}, { _id: true, strict: false });

const CollectionSchema = Schema({

  documents: [DocumentSubSchema]
}, { timestamps: true });

export const Collection = mongoose.model("Collection", CollectionSchema);

