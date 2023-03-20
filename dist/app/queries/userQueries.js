"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUserByUsername = exports.findUserByEmail = exports.addUser = void 0;
const addUser = (user) => {
    return `INSERT INTO users (username, email, password) VALUES ('${user.username}', '${user.email}',
  '${user.password}')`;
};
exports.addUser = addUser;
const findUserByEmail = (user, password) => {
    return `SELECT${password ? ` password, ` : " "}username, id, email, bio, avatar FROM users WHERE email = '${user.email}'`;
};
exports.findUserByEmail = findUserByEmail;
const findUserByUsername = (user, password) => {
    return `SELECT${password ? ` password, ` : " "}username, id, email, bio, avatar FROM users WHERE username = '${user.username}'`;
};
exports.findUserByUsername = findUserByUsername;
const findUserById = (id, password) => {
    return `SELECT${password ? ` password, ` : " "}username, id, email, bio, avatar FROM users WHERE id = '${id}'`;
};
exports.findUserById = findUserById;
