"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLikePost = exports.likePost = exports.getAllUsernamesOnPost = exports.getLikesCountOnPost = void 0;
const getLikesCountOnPost = (postId) => {
    return `
  SELECT COUNT(*) FROM likes WHERE post_id = ${postId}
  `;
};
exports.getLikesCountOnPost = getLikesCountOnPost;
const getAllUsernamesOnPost = (postId) => {
    return `
  SELECT username FROM likes INNER JOIN users ON users.id = likes.user_id WHERE post_id = ${postId}
  `;
};
exports.getAllUsernamesOnPost = getAllUsernamesOnPost;
const likePost = (userId, postId) => {
    return `
  INSERT INTO likes (user_id, post_id) VALUES ('${userId}', '${postId}')
  `;
};
exports.likePost = likePost;
const checkLikePost = (userId, postId) => {
    return `
  SELECT COUNT(*) FROM likes WHERE post_id = ${postId} AND user_id = ${userId}
  `;
};
exports.checkLikePost = checkLikePost;
