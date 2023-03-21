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
exports.deleteComment = exports.createComment = exports.updateComment = exports.getAllCommentsOnPost = void 0;
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const commentQueries_1 = require("../queries/commentQueries");
const getAllCommentsOnPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = +req.params.id;
        const response = yield db_1.default.query((0, commentQueries_1.QgetAllCommentsOnPost)(postId));
        res.status(200).json({
            status: "success",
            message: response.rows,
        });
    }
    catch (err) {
        next(new AppError_1.default(err.message, 502));
    }
});
exports.getAllCommentsOnPost = getAllCommentsOnPost;
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +req.params.uid;
        const postId = +req.params.id;
        const { comment } = req.body;
        if (!comment) {
            return next(new AppError_1.default("Please provide a comment", 403));
        }
        const tComment = comment.trim();
        console.log(req.user);
        if (userId !== req.user.id) {
            return next(new AppError_1.default("Not authorized to comment", 402));
        }
        yield db_1.default.query((0, commentQueries_1.QcreateComment)(tComment, postId, userId));
        res.status(201).json({
            status: "success",
            message: "Comment posted",
        });
    }
    catch (err) {
        next(new AppError_1.default(err.message, 502));
    }
});
exports.createComment = createComment;
const updateComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +req.params.uid;
        const postId = +req.params.id;
        const { comment } = req.body;
        if (!comment)
            return next(new AppError_1.default("please provide comment", 403));
        const updatedTComment = comment.trim();
        if (userId !== req.user.id)
            return next(new AppError_1.default("not authorized to update comment", 402));
        yield db_1.default.query((0, commentQueries_1.QupdateComment)(updatedTComment, postId, userId));
        res.status(201).json({
            status: "success",
            message: "comment updated.",
        });
    }
    catch (err) {
        next(new AppError_1.default(err.message, 502));
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +req.params.uid;
        const postId = +req.params.id;
        if (userId !== req.user.id)
            return next(new AppError_1.default("not authorized to delete a comment", 402));
        yield db_1.default.query((0, commentQueries_1.QdeleteComment)(postId, userId));
        res.status(201).json({
            status: "success",
            message: "comment done",
        });
    }
    catch (err) {
        next(new AppError_1.default(err.message, 502));
    }
});
exports.deleteComment = deleteComment;
