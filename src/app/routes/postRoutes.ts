import express from "express";
import { protect } from "../controllers/auth";
import {
	createPost,
	deletePost,
	getAllPosts,
	getPost,
	updatePost,
	getAllPostsByUserId,
} from "../controllers/postController";

const router = express.Router();

router.route("/").get(protect, getAllPosts).post(protect, createPost);
router
	.route("/:id")
	.get(protect, getPost)
	.patch(protect, updatePost)
	.delete(protect, deletePost);
router.get("/user/:id", protect, getAllPostsByUserId);
export default router;
