import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

// ----> Scheema -------->
import {
    signupSchema,
    loginSchema,
    editSchema,
    passwordSchema,
} from '../schema/User.js';
/// -------  FUNCTION FOR USER REGISTERATION --------------------->
const userRegister = asyncHandler(async (req, res) => {
    try {
        const payload = req.body;
        const result = signupSchema(payload);
        if (result.error) {
            const errors = result.error.details
                .map((detail) => detail.message)
                .join(",");
            throw new ApiError(400, errors);
        }
        const isUserExist = await User.findOne({ email: payload.email });
        if (isUserExist) {
            throw new ApiError(409, "User alrady register on this email");
        }

        const user = await User.create({ ...payload })
        if (!user) {
            throw new ApiError(500, "something went wrong");
        }

        return res.status(201).json(
            new ApiResponse(200, { user: user },"successfully register"),)


    } catch (error) {
           throw new ApiError(500, error.message);
    }
})