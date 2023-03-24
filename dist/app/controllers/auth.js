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
exports.protect = exports.signup = exports.login = void 0;
const db_1 = __importDefault(require("../config/db"));
const userQueries_1 = require("../queries/userQueries");
const AppError_1 = __importDefault(require("../utils/AppError"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (id, email, username) => {
    return jsonwebtoken_1.default.sign({ id, email, username }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const user = req.body;
        console.log(user);
        if ((!user.username && !user.email) || !user.password) {
            console.log(`came here`);
            return next(new AppError_1.default("please provide email and password", 401));
        }
        console.log(user.username, user.password);
        const key = user.username ? "username" : "email";
        const value = ((_a = user.username) === null || _a === void 0 ? void 0 : _a.trim()) || ((_b = user.email) === null || _b === void 0 ? void 0 : _b.trim()); // user can provide username or email to login
        let userLoginCred;
        let response;
        if (key === "username") {
            userLoginCred = { username: value, password: user.password };
            response = yield db_1.default.query((0, userQueries_1.findUserByUsername)(userLoginCred, true));
        }
        else {
            userLoginCred = { email: value, password: user.password };
            response = yield db_1.default.query((0, userQueries_1.findUserByEmail)(userLoginCred, true));
        }
        if (response.rows.length === 0)
            return next(new AppError_1.default("user not found", 402));
        if (!(yield bcryptjs_1.default.compare(user.password, response.rows[0].password)))
            return next(new AppError_1.default("password wrong", 403));
        res.status(200).json({
            status: "success",
            message: {
                username: userLoginCred === null || userLoginCred === void 0 ? void 0 : userLoginCred.username,
                email: response.rows[0].email,
                token: signToken(response.rows[0].id, response.rows[0].email, response.rows[0].username),
            },
        });
    }
    catch (err) {
        console.log(err);
        next(new AppError_1.default(err.message, 404));
    }
});
exports.login = login;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        if (!user.email || !user.password || !user.username)
            return next(new AppError_1.default("please provide emaila and password", 401));
        // Cleansing data
        user.username = user.username.trim();
        user.email = user.email.trim();
        user.password = user.password.trim();
        //Adding Constraints to data
        if (user.username.length < 3 || user.username.includes(" ")) {
            return next(new AppError_1.default("username should be atleast 3 charachters and it shouldnt include spaces", 301));
        }
        if (!validator_1.default.isEmail(user.email)) {
            return res.status(404).json({
                status: "fail",
                message: "Please provide valid email",
            });
        }
        if (user.password.length < 5 || user.password.includes(" ")) {
            return next(new AppError_1.default("password must be atleast 5 chars (no spcaes should be included)", 301));
        }
        user.password = yield bcryptjs_1.default.hash(user.password, 8);
        yield db_1.default.query((0, userQueries_1.addUser)(user));
        const response = yield db_1.default.query((0, userQueries_1.findUserByUsername)(user));
        res.status(201).json({
            status: "success",
            message: {
                username: user.username,
                email: user.email,
                token: signToken(response.rows[0].id, user.email, user.username),
            },
        });
    }
    catch (err) {
        next(new AppError_1.default(err.message, 401));
    }
});
exports.signup = signup;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        let token;
        if ((_d = (_c = req.headers) === null || _c === void 0 ? void 0 : _c.authorization) === null || _d === void 0 ? void 0 : _d.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1];
        if (!token)
            return next(new AppError_1.default("you are not logged in", 401));
        const decodedPayloadData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedPayloadData);
        // we got the token and the payload but still lets check if this user is
        // still present in DB or not
        const response = yield db_1.default.query((0, userQueries_1.findUserByUsername)(decodedPayloadData));
        if (response.rows.length === 0)
            next(new AppError_1.default("token expired", 403));
        req.user = {
            username: decodedPayloadData.username,
            email: decodedPayloadData.email,
            id: decodedPayloadData.id,
        };
        next();
    }
    catch (err) {
        next(new AppError_1.default("internal server error", 502));
    }
});
exports.protect = protect;
