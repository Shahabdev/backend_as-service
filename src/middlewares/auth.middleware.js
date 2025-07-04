import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; // adjust path if needed

export const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized request: No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch user from DB and attach to request
    const existingUser = await User.findById(decoded.id).select("-password"); // exclude password
    if (!existingUser) {
      throw new ApiError(404, "User not found");
    }

    req.user = existingUser;
    next();
  } catch (err) {
    throw new ApiError(401, "Unauthorized request: Invalid or expired token");
  }
};
