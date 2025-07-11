import { Router } from "express";
import { signUp, loginFunction, getCurrentUserData } from "../controllers/user.controller.js"

// --- middleware
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router();
// Routes
router.route("/signup").post(signUp);
router.route("/login").post(loginFunction);
// Authorized Auth
router.route("/get-user-info").get(verifyJwt, getCurrentUserData);
export default router;