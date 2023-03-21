import express from "express";
import { protect } from "../controllers/auth";
import {
	createComment,
	deleteComment,
	getAllCommentsOnPost,
	updateComment,
} from "../controllers/commentController";
import {
	checkLikePost,
	getAllLikesOnPost,
	getAllUsernamesOnPost,
	likePost,
	deleteLikeOnPost,
} from "../controllers/likeControllers";
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

router.route("/:id/like/usernames").get(protect, getAllUsernamesOnPost);
router.route("/:id/like/count").get(protect, getAllLikesOnPost);
router
	.route("/:id/like/user/:uid")
	.get(protect, checkLikePost)
	.post(protect, likePost)
	.delete(protect, deleteLikeOnPost);

/*
 *  COMMENTS - (CRUD) routes
 */
router.route("/:id/comment").get(protect, getAllCommentsOnPost);
router
	.route("/:id/comment/user/:uid")
	.post(protect, createComment)
	.patch(protect, updateComment)
	.delete(protect, deleteComment);
export default router;
