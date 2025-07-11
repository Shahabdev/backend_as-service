import { Router } from "express";
import { createProject, getProject } from "../controllers/project.controller.js"

// --- middleware
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router();
// Routes

// Authorized Auth
router.route("/create-project").post(verifyJwt, createProject);
router.route("/get-project").get(verifyJwt, getProject);
export default router;