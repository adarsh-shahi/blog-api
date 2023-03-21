"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QupdateComment = exports.QgetAllCommentsOnPost = exports.QdeleteComment = exports.QcreateComment = void 0;
const QcreateComment = (comment, postId, userId) => {
    return `
  INSERT INTO comments (comment, post_id, user_id) VALUES ('${comment}', ${postId}, ${userId})
  `;
};
exports.QcreateComment = QcreateComment;
const QdeleteComment = (postId, userId) => {
    return `
    DELETE FROM comments
    WHERE post_id = ${postId} AND user_id = ${userId}
  `;
};
exports.QdeleteComment = QdeleteComment;
const QupdateComment = (comment, postId, userId) => {
    return `
   UPDATE comments
   SET comment = '${comment}'
   WHERE post_id = ${postId} AND user_id = ${userId}
  `;
};
exports.QupdateComment = QupdateComment;
const QgetAllCommentsOnPost = (postId) => {
    return `
    SELECT username, comment FROM comments INNER JOIN users ON users.id = comments.user_id WHERE post_id = ${postId}
  `;
};
exports.QgetAllCommentsOnPost = QgetAllCommentsOnPost;
