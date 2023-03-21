"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const commentController_1 = require("../controllers/commentController");
const likeControllers_1 = require("../controllers/likeControllers");
const postController_1 = require("../controllers/postController");
const router = express_1.default.Router();
/*
 *  POSTS - (CRUD) routes
 */
router.route("/").get(auth_1.protect, postController_1.getAllPosts).post(auth_1.protect, postController_1.createPost);
router
    .route("/:id")
    .get(auth_1.protect, postController_1.getPost)
    .patch(auth_1.protect, postController_1.updatePost)
    .delete(auth_1.protect, postController_1.deletePost);
router.get("/user/:id", auth_1.protect, postController_1.getAllPostsByUserId);
/*
 *  LIKES - (CRUD) routes
 */
// TODO: Handle to delete likes
router.route("/:id/like/usernames").get(auth_1.protect, likeControllers_1.getAllUsernamesOnPost);
router.route("/:id/like/count").get(auth_1.protect, likeControllers_1.getAllLikesOnPost);
router
    .route("/:id/like/user/:uid")
    .get(auth_1.protect, likeControllers_1.checkLikePost)
    .post(auth_1.protect, likeControllers_1.likePost);
/*
 *  COMMENTS - (CRUD) routes
 */
router.route("/:id/comment").get(auth_1.protect, commentController_1.getAllCommentsOnPost);
router
    .route("/:id/comment/user/:uid")
    .post(auth_1.protect, commentController_1.createComment)
    .patch(auth_1.protect, commentController_1.updateComment)
    .delete(auth_1.protect, commentController_1.deleteComment);
exports.default = router;
