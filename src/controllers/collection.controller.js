import { Collection } from "../models/collection.model.js";
import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { collectionSchema } from "../schema/Collection.schema.js";
import { ApiError } from "../utils/ApiError.js";

/// ------> CREATE COLLECTION FUNCTION ----------->
export const createCollection = asyncHandler(async (req, res) => {
    try {
        const payload = req.body;

        const result = collectionSchema(payload);
        console.log("result---", result);
        if (result.error) {
            const errors = result.error.details.map((details) => details.message).join(",");
            throw new ApiError(400, errors);
        }

        const project = await Project.findById(String(payload.projectId));
        console.log("project here ---", project);
        if (!project) {
            throw new ApiError(404, "Project not found ");
        }

        const newCollection = await Collection.create({
            documents: payload.documents || []
        });
        if (!newCollection) {
            throw new ApiError(500, "Something to went wrong here ");
        }
        project.collections.push({
            "id": newCollection._id,
            "collectionName": payload.collectionName,

        });
        await project.save();
        return res.status(200).json({
            "status": true,
            "msg": "Collection Created Successfully",
            "collection": newCollection.documents
        })

    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

/// -------> GET COLECTION  FUNCTION ------------------>
export const getCollection = asyncHandler(async (req, res) => {
    try {
        const collectionId = req.params.id;
        console.log("collection id ", collectionId);
        if (!collectionId) {
            throw new ApiError(400, "Collection id is required");
        }

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            throw new ApiError(404, "Collection not found");
        }

        res.status(200).json({
            "status": true,
            "msg": "Collection get successfully",
            "collection": collection.documents
        })



    } catch (error) {
        throw new ApiError(500, error.message);
    }
})