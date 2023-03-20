"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
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
router.route("/:id/like/usernames").get(auth_1.protect);
router.route("/:id/like/count").get(auth_1.protect);
router.route("/:id/like/user/:uid").get(auth_1.protect).post(auth_1.protect);
exports.default = router;
