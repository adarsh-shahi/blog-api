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

/*
 *  POSTS - (CRUD) routes
 */
router.route("/").get(protect, getAllPosts).post(protect, createPost);
router
	.route("/:id")
	.get(protect, getPost)
	.patch(protect, updatePost)
	.delete(protect, deletePost);
router.get("/user/:id", protect, getAllPostsByUserId);

/*
 *  LIKES - (CRUD) routes
 */

router.route("/:id/like/usernames").get(protect);
router.route("/:id/like/count").get(protect);
router.route("/:id/like/user/:uid").get(protect).post(protect);
export default router;
