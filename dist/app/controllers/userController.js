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
exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const userQueries_1 = require("../queries/userQueries");
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.id;
    const response = yield db_1.default.query((0, userQueries_1.findUserById)(userId, true));
    const { username, email, bio, avatar } = response.rows[0];
    const user = {
        id: userId,
        username,
        email,
        bio,
        avatar,
        password: response.rows[0].password || null,
    };
    res.status(200).json({
        status: "success",
        user: user,
    });
});
exports.getUser = getUser;
const updateUser = () => { };
exports.updateUser = updateUser;
const deleteUser = () => { };
exports.deleteUser = deleteUser;
