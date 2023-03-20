"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPost = exports.getPostsByUserId = exports.deletePostById = exports.updatePostById = exports.findPostById = exports.makePost = void 0;
const makePost = (id, title, content) => {
    return `
    INSERT INTO posts (user_id, title, content) VALUES (${id}, '${title}', '${content}');
  `;
};
exports.makePost = makePost;
const getAllPost = (limit, offset) => {
    return `
  SELECT username, user_id, posts.id, title, content, posts.updated_at FROM posts INNER JOIN users ON users.id = posts.user_id ORDER BY posts.updated_at DESC LIMIT ${limit} OFFSET ${offset};
  `;
};
exports.getAllPost = getAllPost;
const findPostById = (id) => {
    return `
  SELECT posts.id, posts.updated_at, title, content, username, user_id FROM posts INNER JOIN users ON users.id = posts.user_id WHERE posts.id = ${id};
  `;
};
exports.findPostById = findPostById;
const updatePostById = (id, post) => {
    return `
  UPDATE posts SET${post.content ? ` content = '${post.content}' ` : ""}${post.content && post.title ? "," : ""}${post.title ? ` title = '${post.title}' ` : ""}WHERE id = ${id};
  `;
};
exports.updatePostById = updatePostById;
const deletePostById = (id) => {
    return `
     DELETE FROM posts WHERE id = ${id}
  `;
};
exports.deletePostById = deletePostById;
const getPostsByUserId = (userId) => {
    return `
    SELECT posts.id, posts.updated_at, user_id, title, content FROM posts JOIN users ON users.id = posts.user_id WHERE user_id = ${userId}
  `;
};
exports.getPostsByUserId = getPostsByUserId;
