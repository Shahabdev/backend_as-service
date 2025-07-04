import { Router } from "express";
import { createProject } from "../controllers/project.controller.js"

// --- middleware
import {verifyJwt} from  "../middlewares/auth.middleware.js"

const router = Router();
// Routes

// Authorized Auth
router.route("/create-project").post(verifyJwt,createProject);
 export default router;