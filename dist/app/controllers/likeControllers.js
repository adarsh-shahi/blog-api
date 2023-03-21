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
exports.deleteLikeOnPost = exports.likePost = exports.checkLikePost = exports.getAllUsernamesOnPost = exports.getAllLikesOnPost = void 0;
const db_1 = __importDefault(require("../config/db"));
const likeQueries_1 = require("../queries/likeQueries");
const AppError_1 = __importDefault(require("../utils/AppError"));
var LIKE_PURPOSE;
(function (LIKE_PURPOSE) {
    LIKE_PURPOSE[LIKE_PURPOSE["ADD_LIKE"] = 0] = "ADD_LIKE";
    LIKE_PURPOSE[LIKE_PURPOSE["CHECK_LIKE"] = 1] = "CHECK_LIKE";
    LIKE_PURPOSE[LIKE_PURPOSE["GET_USERNAMES"] = 2] = "GET_USERNAMES";
    LIKE_PURPOSE[LIKE_PURPOSE["GET_COUNT"] = 3] = "GET_COUNT";
    LIKE_PURPOSE[LIKE_PURPOSE["DELETE_LIKE"] = 4] = "DELETE_LIKE";
})(LIKE_PURPOSE || (LIKE_PURPOSE = {}));
const likeHandler = (postId, getQuery, res, next, action, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_1.default.query(getQuery(postId, userId));
        console.log(response);
        let message;
        switch (action) {
            case LIKE_PURPOSE.ADD_LIKE:
                message = "liked";
                break;
            case LIKE_PURPOSE.CHECK_LIKE:
                message = response.rows[0].count === "1";
                break;
            case LIKE_PURPOSE.GET_COUNT:
                message = response.rows[0].count;
                break;
            case LIKE_PURPOSE.GET_USERNAMES:
                message = response.rows.map((obj) => obj.username);
                break;
            case LIKE_PURPOSE.DELETE_LIKE:
                message = "like deleted";
                break;
            default:
                throw new Error("unhandled like action");
        }
        res.status(200).json({
            status: "success",
            message,
        });
    }
    catch (err) {
        next(new AppError_1.default(err.message, 502));
    }
});
const getAllLikesOnPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return likeHandler(+req.params.id, likeQueries_1.QgetLikesCountOnPost, res, next, LIKE_PURPOSE.GET_COUNT);
});
exports.getAllLikesOnPost = getAllLikesOnPost;
const getAllUsernamesOnPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return likeHandler(+req.params.id, likeQueries_1.QgetAllUsernamesOnPost, res, next, LIKE_PURPOSE.GET_USERNAMES);
});
exports.getAllUsernamesOnPost = getAllUsernamesOnPost;
const likePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.id !== +req.params.uid)
        return next(new AppError_1.default("you are not authorized to like this post", 403));
    likeHandler(+req.params.id, likeQueries_1.QlikePost, res, next, LIKE_PURPOSE.ADD_LIKE, +req.params.uid);
});
exports.likePost = likePost;
const deleteLikeOnPost = (req, res, next) => {
    if (req.user.id !== +req.params.uid)
        return next(new AppError_1.default("you are not authorized to unlike this post", 403));
    likeHandler(+req.params.id, likeQueries_1.QdeleteLikeOnPost, res, next, LIKE_PURPOSE.DELETE_LIKE, +req.params.uid);
};
exports.deleteLikeOnPost = deleteLikeOnPost;
const checkLikePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return likeHandler(+req.params.id, likeQueries_1.QcheckLikePost, res, next, LIKE_PURPOSE.CHECK_LIKE, +req.params.uid);
});
exports.checkLikePost = checkLikePost;
