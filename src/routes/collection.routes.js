import { Router } from "express";
import { createCollection, getCollection ,setDocumentInCollection, updateDocumentInCollection,deleteCollection} from "../controllers/collection.controller.js";

// --- middleware
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router();
// Routes

// Authorized Auth
router.route("/create-collection").post(verifyJwt, createCollection);
router.route("/get-collection/:id").get(verifyJwt, getCollection);
router.route("/set-document/:collectionId/:documentId").post(verifyJwt, setDocumentInCollection);
router.route("/update-document/:collectionId/:documentId").put(verifyJwt, updateDocumentInCollection);
router.route("/delete-collection/:collectionId").delete(verifyJwt, deleteCollection);
export default router;