"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QdeleteLikeOnPost = exports.QcheckLikePost = exports.QlikePost = exports.QgetAllUsernamesOnPost = exports.QgetLikesCountOnPost = void 0;
const QgetLikesCountOnPost = (postId) => {
    return `
  SELECT COUNT(*) as count FROM likes WHERE post_id = ${postId}
  `;
};
exports.QgetLikesCountOnPost = QgetLikesCountOnPost;
const QgetAllUsernamesOnPost = (postId) => {
    return `
  SELECT username FROM likes INNER JOIN users ON users.id = likes.user_id WHERE post_id = ${postId}
  `;
};
exports.QgetAllUsernamesOnPost = QgetAllUsernamesOnPost;
const QlikePost = (postId, userId) => {
    return `
  INSERT INTO likes (user_id, post_id) VALUES ('${userId}', '${postId}')
  `;
};
exports.QlikePost = QlikePost;
const QdeleteLikeOnPost = (postId, userId) => {
    return `
  DELETE FROM likes
  WHERE post_id = ${postId} AND user_id = ${userId}
  `;
};
exports.QdeleteLikeOnPost = QdeleteLikeOnPost;
const QcheckLikePost = (postId, userId) => {
    return `
  SELECT COUNT(*) FROM likes WHERE post_id = ${postId} AND user_id = ${userId}
  `;
};
exports.QcheckLikePost = QcheckLikePost;
