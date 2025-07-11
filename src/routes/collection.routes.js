import { Router } from "express";
import { createCollection, getCollection } from "../controllers/collection.controller.js";

// --- middleware
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router();
// Routes

// Authorized Auth
router.route("/create-collection").post(verifyJwt, createCollection);
router.route("/get-collection/:id").get(verifyJwt, getCollection);
export default router;