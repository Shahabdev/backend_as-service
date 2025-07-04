import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { projectSchema } from "../schema/Project.schema.js"
import { Project } from "../models/project.model.js";


//-------- CREATING PROJECT FUNCTION ----------->

export  const createProject = asyncHandler(async (req,res) => {
    try{
        const payload = req.body;
        const result  =  projectSchema(payload);

        if(result.error){
            const errors  = result.error.details.map((detail) => detail.message).join(",");
            throw  new ApiError(400,errors);
        }

        const project = await Project.create({...payload});
        if(!project){
            throw new ApiError(500,"something went wrong")
        }
        res.status(201).json({
            "status": true,
            "msg":"Project created successfully",
             "project" : project
        });

    }catch(error) {
        throw new ApiError(500,error);
    }
})