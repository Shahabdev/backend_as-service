import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { generateToken } from "../utils/Methods.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// ----> Scheema -------->
import {
    signupSchema,
    loginSchema,
    // editSchema,
    // passwordSchema,
} from '../schema/User.schema.js';
/// -------  FUNCTION FOR USER REGISTERATION --------------------->
export const signUp = asyncHandler(async (req, res) => {

    try {
        const payload = req.body;
        console.log("data", payload);
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
            new ApiResponse(200, { user: user }, "successfully register"),)


    } catch (error) {
        console.log("here --------->");
        throw new ApiError(500, error.message);
    }
})

/// -------  FUNCTION FOR LOGIN --------------------->
export const loginFunction = asyncHandler(async (req, res) => {
    try {
        const payload = req.body;
        console.log("email---", payload);
        const result = loginSchema(payload);
        if (result.error) {
            const errors = result.error.details.map((detail) => detail.message).join(",");
            throw new ApiError(400, errors);
        }

        const user = await User.findOne({ email: payload.email }).select("+password");
        if (!user) {
            throw new ApiError(400, "User not found")
        }
        const isPasswordCorrect = await user.isPasswordCorrect(payload.password);
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Password is wrong");
        }

        const token = generateToken(user._id);
        return res.status(200).json({
            status: true,
            msg: "Login Successfully",
            user: user,
            token: token
        })

    } catch (error) {
        throw new ApiError(500, error);
    }
});

/// -------  FUNCTION TO GET CURRENT USER DATA --------------------->
export const getCurrentUserData = asyncHandler(async (req, res) => {

    return res.status(200)
        .json(
            {
                "status": true,
                "user": req.user,
                "msg": "Get Successfully"
            }

        )
});