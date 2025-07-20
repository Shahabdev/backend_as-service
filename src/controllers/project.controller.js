import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { projectSchema } from "../schema/Project.schema.js"
import { Project } from "../models/project.model.js";
import  { Collection} from "../models/collection.model.js"

//-------- CREATING PROJECT FUNCTION ----------->

export const createProject = asyncHandler(async (req, res) => {
    try {
        const payload = req.body;
        const result = projectSchema(payload);

        if (result.error) {
            const errors = result.error.details.map((detail) => detail.message).join(",");
            throw new ApiError(400, errors);
        }

        const project = await Project.create({ ...payload });
        if (!project) {
            throw new ApiError(500, "something went wrong")
        }
        res.status(201).json({
            "status": true,
            "msg": "Project created successfully",
            "project": project
        });

    } catch (error) {
        throw new ApiError(500, error);
    }
});

// ------- GET PROJECT FUNCTION --------------->
export const getProject = asyncHandler(async (req, res) => {
    try {
        const projects = await Project.find().lean();

        return res.status(200).json({
            "status": true,
            "msg": "Get Successfully",
            "project": projects
        })


    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

/// --------->  FUNCTION FOR DELETING THE PROJECT ------------------>
export const deleteProject = asyncHandler(async (req,res) => {
    try {
        const {projectId} = req.params;
        console.log(projectId)
        if(!projectId) {
            throw new ApiError(400,"Project Id is required");
        }
        const project = await Project.findById(projectId);

        if(!project) {
            throw new ApiError(404,"Project not found");
        }

        await Collection.deleteMany({projectId});

        await Project.findByIdAndDelete(projectId);

         return res.status(200).json({
      status: true,
      msg: "Project and related collections deleted successfully",
    });

        
    } catch (error) {
        throw new ApiError(500, error.message);
    }
})

