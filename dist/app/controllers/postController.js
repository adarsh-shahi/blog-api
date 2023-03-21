"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostsByUserId = exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = exports.getAllPosts = void 0;
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const postQueries_1 = require("../queries/postQueries");
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = +(req.query.limit || "") || 2;
        const page = +(req.query.page || "") || 1;
        const response = yield db_1.default.query((0, postQueries_1.getAllPost)(limit, limit * (page - 1)));
        console.log(response);
        res.status(200).json({
            status: "success",
            message: {
                postLength: response.rowCount,
                posts: response.rows,
            },
        });
    }
    catch (err) {
        console.log(err.message);
        next(new AppError_1.default("internal server error", 502));
    }
});
exports.getAllPosts = getAllPosts;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, url, } = req.body;
        if (!content || !title)
            return next(new AppError_1.default("add content and title to make a post", 401));
        yield db_1.default.query((0, postQueries_1.makePost)(req.user.id, title, content, url));
        res.status(201).json({
            status: "success",
            message: "posted",
        });
    }
    catch (err) {
        console.log(err);
        next(new AppError_1.default(err.message, 500));
    }
});
exports.createPost = createPost;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_1.default.query((0, postQueries_1.findPostById)(+req.params.id));
        if (!response.rows.length)
            return next(new AppError_1.default("post not found", 404));
        const postData = {
            username: response.rows[0].username,
            user_id: response.rows[0].user_id,
            title: response.rows[0].title,
            content: response.rows[0].content,
            post_id: response.rows[0].id,
            updated_at: response.rows[0].updated_at,
        };
        res.status(200).json(postData);
    }
    catch (err) {
        console.log(err);
        next(new AppError_1.default(err.message, 500));
    }
});
exports.getPost = getPost;
const getAllPostsByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.id;
    const response = yield db_1.default.query((0, postQueries_1.getPostsByUserId)(userId));
    const totalPosts = response.rows.length;
    console.log(response.rows);
    res.status(200).json({
        status: "success",
        message: {
            totalPosts,
            posts: response.rows,
        },
    });
});
exports.getAllPostsByUserId = getAllPostsByUserId;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = +req.params.id;
        const { content, title, url, } = req.body;
        if (!content && !title)
            return next(new AppError_1.default("must have title or content to edit", 403));
        const response = yield db_1.default.query((0, postQueries_1.findPostById)(postId));
        console.log(response);
        if (response.rows[0].user_id !== req.user.id)
            return next(new AppError_1.default("You are not authorized to edit this post", 403));
        const post = {
            title: "",
            content: "",
            url: "",
        };
        if (title)
            post.title = title;
        if (content)
            post.content = content;
        if (url)
            post.url = url;
        yield db_1.default.query((0, postQueries_1.updatePostById)(postId, post));
        res.status(201).json({
            status: "success",
            message: "post updated",
        });
    }
    catch (err) {
        console.log(err);
        next(new AppError_1.default(err.message, 500));
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = +req.params.id;
        const response = yield db_1.default.query((0, postQueries_1.findPostById)(postId));
        if (response.rows[0].user_id !== req.user.id)
            return next(new AppError_1.default("You are not authorized to delete this post", 403));
        yield db_1.default.query((0, postQueries_1.deletePostById)(postId));
        res.status(201).json({
            status: "success",
            message: "post deleted",
        });
    }
    catch (err) {
        next(new AppError_1.default("internal server error", 500));
    }
});
exports.deletePost = deletePost;
