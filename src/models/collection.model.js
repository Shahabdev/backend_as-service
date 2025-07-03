import mongoose, {Schema} from "mongoose";

const CollectionSchema  =  Schema({
    projectId : {
        type : Schema.Types.ObjectId,
        ref : "Project",
        required :  true
    },
    name : {
        type : String,
        required :  true
    },
    documents :[
        {
            fields: {
                type : Map,
                of : Schema.Types.Mixed,
                required :  true
            }
        }
    ]
},{timestamps : true});

export const Collection =  mongoose.model("Collection",CollectionSchema);