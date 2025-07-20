import { Router } from "express";
import { createProject, getProject,deleteProject } from "../controllers/project.controller.js"

// --- middleware
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router();
// Routes

// Authorized Auth
router.route("/create-project").post(verifyJwt, createProject);
router.route("/get-project").get(verifyJwt, getProject);
router.route("/delete-project/:projectId").delete(verifyJwt, deleteProject);
export default router;