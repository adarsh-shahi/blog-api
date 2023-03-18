import express from "express";
import { protect } from "../controllers/auth";
import {
	createPost,
	deletePost,
	getAllPosts,
	getPost,
	updatePost,
} from "../controllers/postController";

const router = express.Router();

router.route("/").get(protect, getAllPosts).post(protect, createPost);
router
	.route("/:id")
	.get(protect, getPost)
	.patch(protect, updatePost)
	.delete(protect, deletePost);

export default router;
